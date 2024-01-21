import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import InputField from '../src/components/InputField';

test('mock random text input and check the state update', () => {
  // Void
  const placeholder_test = 'testing';
  const mockOnChangeText = jest.fn();

  const { getByPlaceholderText } = render(
    <InputField
      placeholder={placeholder_test}
      onChangeText={mockOnChangeText}
      value={''}
    />,
  );

  const inputField = getByPlaceholderText(placeholder_test);

  // Write text
  fireEvent.changeText(inputField, 'New Text');

  expect(inputField.props.value).toBe('New Text');
  expect(mockOnChangeText).toHaveBeenCalledWith('New Text');
});
