import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import Icon from '../src/components/Icon';

test('Icon component onPress event', () => {
  const mockOnPress = jest.fn();
  const testImageSource = require('../src/assets/test-home.png');

  const { getByTestId } = render(
    <Icon 
      source={testImageSource} 
      size={30} 
      onPress={mockOnPress}
      testID="icon-test"
    />
  );

  const icon = getByTestId('icon-test');
  fireEvent.press(icon);

  expect(mockOnPress).toHaveBeenCalled();
  expect(icon).toBeDefined();
});
