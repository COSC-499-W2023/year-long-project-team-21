import React from 'react';
import { act, fireEvent, render } from '@testing-library/react-native';
import CreateAd from '../src/screens/CreateAd';
import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import { launchImageLibrary } from 'react-native-image-picker';

jest.mock('axios');
jest.mock('react-native', () => {
  const rn = jest.requireActual('react-native');
  rn.Alert.alert = jest.fn();
  return rn;
});
jest.mock('react-native-image-picker', () => ({
    launchImageLibrary: jest.fn(),
}));

describe('CreateAd Screen', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Clear all mocks including axios
      });

    it('renders the CreateAd screen correctly', () => {
        const { getByText, getByPlaceholderText } = render(<CreateAd navigation={undefined} />);

        expect(getByText('Food Name')).toBeDefined();
        expect(getByPlaceholderText('Title')).toBeDefined();
        expect(getByText('Description (optional)')).toBeDefined();
        expect(getByPlaceholderText('Description')).toBeDefined();
        expect(getByText('Pick an image of the food')).toBeDefined();
        expect(getByText('Set an expiry range')).toBeDefined();
        expect(getByText('Submit')).toBeDefined();
    });
});

describe('CreateAd Screen - InputFields', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    it('allows entering a title in the Title InputField', () => {
      const { getByPlaceholderText } = render(<CreateAd navigation={undefined} />);
      const titleInput = getByPlaceholderText('Title');
  
      fireEvent.changeText(titleInput, 'Delicious Pizza');
      expect(titleInput.props.value).toBe('Delicious Pizza');
    });
  
    it('allows entering a description in the Description InputField', () => {
      const { getByPlaceholderText } = render(<CreateAd navigation={undefined} />);
      const descriptionInput = getByPlaceholderText('Description');
  
      fireEvent.changeText(descriptionInput, 'A tasty homemade pizza');
      expect(descriptionInput.props.value).toBe('A tasty homemade pizza');
    });
});

describe('CreateAd Screen - ImagePickerButton', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    const handleSetImageUri = jest.fn();
  
    it('calls onImagePicked with image URI when an image is picked', async () => {
      const imageUri = '../src/assets/home.png';
      /*
      launchImageLibrary.mockResolvedValueOnce({
        assets: [{ uri: imageUri }],
      });
      */
  
      const { getByTestId } = render(<CreateAd navigation={undefined} />);
      const imagePickerButton = getByTestId('image-picker');
  
      await act(async () => {
        fireEvent.press(imagePickerButton);
      });
  
      expect(launchImageLibrary).toHaveBeenCalled();
      // Verify if the mock function is called with the correct URI
      // You may need to adjust this based on how `handleSetImageUri` updates the state
      expect(launchImageLibrary).toHaveBeenCalledWith(imageUri);
    });
  
    // Additional tests for other functionalities...
});
