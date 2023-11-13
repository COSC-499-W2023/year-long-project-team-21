import React, { useState } from 'react';
import { View, TextInput, StyleProp, TextStyle, ViewStyle } from 'react-native';
import styles from '../styles/inputFieldStyles';

/**
 * InputFieldProps interface for the InputField component.
 *
 * @interface
 * @property {string} placeholder - The placeholder text to display in the input field.
 * @property {(input: string) => void} onChangeText - Callback function to notify parent components when the text changes.
 * @property {string | number} value - The initial value of the input field.
 * @property {boolean} [secureTextEntry=false] - If true, the text input obscures the text entered so that sensitive text like passwords is secure.
 */
interface InputFieldProps {
  placeholder: string;
  onChangeText: (input: string) => void;
  value: string | number;
  secureTextEntry?: boolean;
  style?: StyleProp<ViewStyle & TextStyle>;
}

/**
 * InputField component.
 *
 * A component for capturing and editing text input. It can be used for various types of text input like usernames, passwords, and general text.
 *
 * @component
 * @param {InputFieldProps} props - The props for the component.
 * @param {string} props.placeholder - The placeholder text for the input field.
 * @param {(inputText: string) => void} props.onChangeText - Callback function to handle changes in text input.
 * @param {string | number} props.value - The initial value of the input field.
 * @param {boolean} [props.secureTextEntry=false] - Enables secure text entry for sensitive information like passwords.
 * @example
 * <InputField
 *   placeholder="Username"
 *   onChangeText={(text) => console.log(text)}
 *   value=""
 *   secureTextEntry={false}
 * />
 */
const InputField: React.FC<InputFieldProps> = ({
  placeholder,
  onChangeText,
  value,
  secureTextEntry = false,
  style
}) => {
  const [text, setText] = useState('');

  /**
   * Handles changes in the input field.
   * Updates the local state and notifies parent components through the onChangeText prop.
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
        style={[styles.container,style]}
        placeholder={placeholder}
        onChangeText={handleChange}
        value={text}
        secureTextEntry={secureTextEntry}
      />
    </>
  );
};

export default InputField;
