import React, { useState } from 'react';
import { View, TextInput } from 'react-native';

interface InputFieldProps {
  placeholder: string;
  onChangeText: (input: string) => void;
  value: string | number;
}
import styles from '../styles/inputFieldStyles';

/**
 * InputField component.
 *
 * @component
 * @param {InputFieldProps} props - The props for the component.
 * @param {string} props.placeholder - The placeholder text to display in the input field.
 * @param {(inputText: string) => void} props.onChangeText - Callback function to notify parent components when the text changes.
 * @param {string} props.value - The initial value of the input field.
 *
 * @example
 * <InputField placeholder="Enter text" onChangeText={(text) => console.log(text)} value="Initial value" />
 */
const InputField: React.FC<InputFieldProps> = ({
  placeholder,
  onChangeText,
}) => {
  const [text, setText] = useState('');

  /**
   * Handle the change of the input field's text.
   * Updates the local state and also notifies parent components through the onChangeText prop.
   *
   * @function
   * @param {string} inputText - The new text in the input field.
   */
  const handleChange = (inputText: string) => {
    setText(inputText);
    onChangeText(inputText);
  };

  return (
    <>
      <View style={styles.space} />
      <TextInput
        style={styles.container}
        placeholder={placeholder}
        onChangeText={handleChange}
        value={text}
      />
    </>
  );
};

export default InputField;
