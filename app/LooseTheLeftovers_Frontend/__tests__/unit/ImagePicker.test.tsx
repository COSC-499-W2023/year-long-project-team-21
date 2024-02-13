import React from 'react';
import { act, fireEvent, render } from '@testing-library/react-native';
import ImagePickerButton from '../../src/components/ImagePicker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

// Mocking the launchImageLibrary and launchCamera functions
jest.mock('react-native-image-picker', () => ({
  launchImageLibrary: jest.fn(),
  launchCamera: jest.fn(),
}));

const galleryTest = 'gallery-test';
const cameraTest = 'camera-test';
const imageTest = 'selected-image';
const mockImageUri = '../src/assets/home.png';

describe('ImagePicker component', () => {
  const handleSetImageUri = jest.fn();

  it('renders correctly with both buttons', () => {
    const { getByTestId } = render(
      <ImagePickerButton onImagePicked={handleSetImageUri} />,
    );

    const galleryButton = getByTestId(galleryTest);
    const cameraButton = getByTestId(cameraTest);

    expect(galleryButton).toBeDefined();
    expect(cameraButton).toBeDefined();
  });

  it('calls launchImageLibrary when the "Open Gallery" is pressed', async () => {
    const mockLaunchImageLibrary = launchImageLibrary as jest.Mock;
    mockLaunchImageLibrary.mockResolvedValueOnce({
      assets: [{ uri: mockImageUri }],
    });

    const { getByTestId } = render(
      <ImagePickerButton onImagePicked={handleSetImageUri} />,
    );

    const galleryButton = getByTestId(galleryTest);
    await act(async () => {
      fireEvent.press(galleryButton);
    });

    expect(mockLaunchImageLibrary).toHaveBeenCalled();
  });

  it('calls launchCamera when the "Open Camera" is pressed', async () => {
    const mockLaunchCamera = launchCamera as jest.Mock;
    mockLaunchCamera.mockResolvedValueOnce({
      assets: [{ uri: mockImageUri }],
    });

    const { getByTestId } = render(
      <ImagePickerButton onImagePicked={handleSetImageUri} />,
    );

    const cameraButton = getByTestId(cameraTest);
    await act(async () => {
      fireEvent.press(cameraButton);
    });

    expect(mockLaunchCamera).toHaveBeenCalled();
  });

  it('displays image after gallery selection', async () => {
    const mockLaunchImageLibrary = launchImageLibrary as jest.Mock;
    mockLaunchImageLibrary.mockResolvedValueOnce({
      assets: [{ uri: mockImageUri }],
    });

    const { getByTestId, findByTestId } = render(
      <ImagePickerButton onImagePicked={handleSetImageUri} />,
    );

    const galleryButton = getByTestId(galleryTest);
    await act(async () => {
      fireEvent.press(galleryButton);
    });

    const imageElement = await findByTestId(imageTest);
    expect(imageElement.props.source.uri).toBe(mockImageUri);
  });

  it('displays image after selection', async () => {
    const mockLaunchCamera = launchCamera as jest.Mock;
    mockLaunchCamera.mockResolvedValueOnce({
      assets: [{ uri: mockImageUri }],
    });

    const { getByTestId, findByTestId } = render(
      <ImagePickerButton onImagePicked={handleSetImageUri} />,
    );

    const cameraButton = getByTestId(cameraTest);
    await act(async () => {
      fireEvent.press(cameraButton);
    });
    const imageElement = await findByTestId(imageTest);
    expect(imageElement.props.source.uri).toBe(mockImageUri);
  });
});
