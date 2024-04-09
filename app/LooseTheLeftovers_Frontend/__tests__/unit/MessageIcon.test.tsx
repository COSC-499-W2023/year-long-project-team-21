import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import MessageIcon from '../../src/components/MessageIcon';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

describe('MessageIcon Component', () => {
  it('navigates to ChatList screen when clicked', () => {
    // Mock the navigation object
    const mockNavigate = jest.fn();
    jest
      .spyOn(require('@react-navigation/native'), 'useNavigation')
      .mockReturnValue({
        navigate: mockNavigate,
      });

    // Render the component
    const { getByTestId } = render(
      <MessageIcon size={45} testID="MessageIconTest" />,
    );

    // Simulate a click on the image
    fireEvent.press(getByTestId('MessageIconTest'));

    // Check if navigate was called with the correct parameters
    expect(mockNavigate).toHaveBeenCalledWith('ChatList', {
      name: 'MessageIcon',
    });
  });
});
