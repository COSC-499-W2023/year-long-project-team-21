import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import ImagePickerButton from '../../src/components/ImagePicker';
import { launchImageLibrary } from 'react-native-image-picker';

// Mocking the launchImageLibrary function
jest.mock('react-native-image-picker', () => ({
  launchImageLibrary: jest.fn(),
}));

describe('ImagePickerButton component', () => {
  const handleSetImageUri = jest.fn();

  it('renders correctly with a button', () => {
    const { getByTestId } = render(
      <ImagePickerButton onImagePicked={handleSetImageUri} />,
    );

    const buttonElement = getByTestId('image-picker');
    expect(buttonElement).toBeDefined();
  });

  it('calls launchImageLibrary function when the button is pressed', async () => {
    const mockLaunchImageLibrary = launchImageLibrary as jest.Mock;
    mockLaunchImageLibrary.mockResolvedValueOnce({
      assets: [{ uri: '../src/assets/home.png' }],
    });

    const { getByTestId } = render(
      <ImagePickerButton onImagePicked={handleSetImageUri} />,
    );

    const buttonElement = getByTestId('image-picker');
    fireEvent.press(buttonElement);

    expect(mockLaunchImageLibrary).toHaveBeenCalled();
  });

  it('displays image after selection', async () => {
    const mockImageUri = '../src/assets/home.png';
    const mockLaunchImageLibrary = launchImageLibrary as jest.Mock;
    mockLaunchImageLibrary.mockResolvedValueOnce({
      assets: [{ uri: mockImageUri }],
    });

    const { getByTestId, findByTestId } = render(
      <ImagePickerButton onImagePicked={handleSetImageUri} />,
    );

    const buttonElement = getByTestId('image-picker');
    fireEvent.press(buttonElement);

    const imageElement = await findByTestId('selected-image');
    expect(imageElement.props.source.uri).toBe(mockImageUri);
  });
});
