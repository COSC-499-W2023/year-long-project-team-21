import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Logo from '../../src/components/Logo';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

describe('HomeIcon Component', () => {
  it('navigates to Instruction screen when clicked', () => {
    // Mock the navigation object
    const mockNavigate = jest.fn();
    jest
      .spyOn(require('@react-navigation/native'), 'useNavigation')
      .mockReturnValue({
        navigate: mockNavigate,
      });

    // Render the component
    const { getByTestId } = render(<Logo size={45} testID="LogoTest" />);

    // Simulate a click on the image
    fireEvent.press(getByTestId('LogoTest'));

    // Check if navigate was called with the correct parameters
    expect(mockNavigate).toHaveBeenCalledWith('Instruction', {
      name: 'Logo',
    });
  });
});
