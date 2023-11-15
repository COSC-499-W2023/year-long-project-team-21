import React from 'react';
import InputField from '../src/components/InputField';

import { fireEvent, render } from '@testing-library/react-native';
test('mock random text input and check the state update', () => {
  //void
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

  // write text
  fireEvent.changeText(inputField, 'New Text');

  expect(inputField.props.value).toBe('New Text');
  expect(mockOnChangeText).toHaveBeenCalledWith('New Text');
});

