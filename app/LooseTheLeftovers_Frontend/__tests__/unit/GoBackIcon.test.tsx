import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import GoBackIcon from '../../src/components/GoBackIcon';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

describe('GoBackIcon Component', () => {
  it('navigates back when clicked', () => {
    // Mock the navigation object
    const mockGoBack = jest.fn();
    jest
      .spyOn(require('@react-navigation/native'), 'useNavigation')
      .mockReturnValue({
        goBack: mockGoBack,
      });

    // Render the component
    const { getByTestId } = render(
      <GoBackIcon size={45} testID="GoBackIconTest" />,
    );

    // Simulate a click on the icon
    fireEvent.press(getByTestId('GoBackIconTest'));

    // Check if goBack was called
    expect(mockGoBack).toHaveBeenCalledTimes(1);
  });
});
