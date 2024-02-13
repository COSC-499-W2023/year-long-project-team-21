import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import MessageIcon from '../../src/components/CreateAdIcon';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

describe('CreateAdIcon Component', () => {
  it('navigates to CreateAd screen when clicked', () => {
    // Mock the navigation object
    const mockNavigate = jest.fn();
    jest
      .spyOn(require('@react-navigation/native'), 'useNavigation')
      .mockReturnValue({
        navigate: mockNavigate,
      });

    // Render the component
    const { getByTestId } = render(
      <MessageIcon size={45} testID="CreateAdIconTest" />,
    );

    // Simulate a click on the image
    fireEvent.press(getByTestId('CreateAdIconTest'));

    // Check if navigate was called with the correct parameters
    expect(mockNavigate).toHaveBeenCalledWith('CreateAd', {
      name: 'CreateAdIcon',
    });
  });
});
