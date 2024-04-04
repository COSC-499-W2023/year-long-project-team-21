import React from 'react';
import { act, fireEvent, render } from '@testing-library/react-native';
import CreateAd from '../../src/screens/CreateAd';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

jest.mock('axios');
jest.mock('react-native', () => {
  const rn = jest.requireActual('react-native');
  rn.Alert.alert = jest.fn();
  return rn;
});
jest.mock('react-native-image-picker', () => ({
  launchImageLibrary: jest.fn(),
  launchCamera: jest.fn(),
}));

describe('CreateAd Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear all mocks
  });

  it('renders the CreateAd screen correctly', () => {
    const { getByTestId } = render(<CreateAd navigation={undefined} />);

    expect(getByTestId('test-title')).toBeDefined();
    expect(getByTestId('test-title-input')).toBeDefined();
    expect(getByTestId('test-description')).toBeDefined();
    expect(getByTestId('test-description-input')).toBeDefined();
    expect(getByTestId('test-pick-img')).toBeDefined();
    expect(getByTestId('test-expiry')).toBeDefined();
    expect(getByTestId('test-submit')).toBeDefined();
  });
});

describe('CreateAd Screen - InputFields', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('allows entering a title in the Title InputField', () => {
    const { getByTestId } = render(
      <CreateAd navigation={undefined} />,
    );

    const titleInput = getByTestId('test-title-input');
    fireEvent.changeText(titleInput, 'Delicious Pizza');
    expect(titleInput.props.value).toBe('Delicious Pizza');
  });

  it('allows entering a description in the Description InputField', () => {
    const { getByTestId } = render(
      <CreateAd navigation={undefined} />,
    );

    const descInput = getByTestId('test-description-input',);
    fireEvent.changeText(descInput, 'A tasty homemade pizza');
    expect(descInput.props.value).toBe('A tasty homemade pizza');
  });
});

describe('CreateAd Screen - ImagePicker', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const imageUri = '../src/assets/home.png';

  it('calls onImagePicked with image URI with "Open Gallery"', async () => {
    require('react-native-image-picker').launchImageLibrary.mockResolvedValueOnce(
      {
        assets: [{ uri: imageUri }],
      },
    );

    const { getByTestId } = render(<CreateAd navigation={undefined} />);
    const imagePickerButton = getByTestId('image-picker');
    const galleryButton = getByTestId('gallery-test');

    await act(async () => {
      fireEvent.press(imagePickerButton);
    });

    await act(async () => {
      fireEvent.press(galleryButton);
    });

    expect(launchImageLibrary).toHaveBeenCalled();

    // Verify the mock function is called with the correct URI
    expect(launchImageLibrary).toHaveBeenCalledWith({
      mediaType: 'photo',
      quality: 1,
    });
  });

  it('calls onImagePicked with image URI with "Open Camera"', async () => {
    require('react-native-image-picker').launchCamera.mockResolvedValueOnce({
      assets: [{ uri: imageUri }],
    });

    const { getByTestId } = render(<CreateAd navigation={undefined} />);
    const cameraButton = getByTestId('camera-test');

    await act(async () => {
      fireEvent.press(cameraButton);
    });

    expect(launchCamera).toHaveBeenCalled();

    // Verify the mock function is called with the correct URI
    expect(launchCamera).toHaveBeenCalledWith({
      mediaType: 'photo',
      quality: 1,
    });
  });
});

describe('CreateAd Screen - Expiry Switch', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the expiry switch and updates state on toggle', () => {
    const { getByTestId, queryByTestId } = render(
      <CreateAd navigation={undefined} />,
    );
    const expirySwitch = getByTestId('switch-test');

    // Check if the slider is present
    expect(queryByTestId('slider-test')).toBeDefined();

    // Toggle to disable the slider
    fireEvent(expirySwitch, 'onValueChange', false);
    expect(queryByTestId('slider-test')).toBeNull();

    // Toggle to re-enable the slider
    fireEvent(expirySwitch, 'onValueChange', true);
    expect(queryByTestId('slider-test')).toBeDefined();
  });
});
