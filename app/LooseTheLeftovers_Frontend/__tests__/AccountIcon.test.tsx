import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import MessageIcon from '../src/components/AccountIcon';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

describe('AccountIcon Component', () => {
  it('navigates to Profile screen when clicked', () => {
    // Mock the navigation object
    const mockNavigate = jest.fn();
    jest
      .spyOn(require('@react-navigation/native'), 'useNavigation')
      .mockReturnValue({
        navigate: mockNavigate,
      });

    // Render the component
    const { getByTestId } = render(
      <MessageIcon size={45} testID="AccountIconTest" />,
    );

    // Simulate a click on the image
    fireEvent.press(getByTestId('AccountIconTest'));

    // Check if navigate was called with the correct parameters
    expect(mockNavigate).toHaveBeenCalledWith('Profile', {
      name: 'AccountIcon',
    });
  });
});
