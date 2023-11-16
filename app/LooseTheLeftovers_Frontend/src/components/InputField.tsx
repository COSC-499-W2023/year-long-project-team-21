import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../styles/inputFieldStyles';
import { type InputFieldProps } from '../components/type';

/**
 * InputFieldProps interface for the InputField component.
 *
 * @interface
 * @property {string} placeholder - The placeholder text to display in the input field.
 * @property {(input: string) => void} onChangeText - Callback function to notify parent components when the text changes.
 * @property {string | number} value - The initial value of the input field.
 * @property {boolean} [secureTextEntry=false] - If true, the text input obscures the text entered so that sensitive text like passwords is secure.
 */

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
  secureTextEntry = false,
}) => {
  const [text, setText] = useState('');
  const [isSecure, setIsSecure] = useState(secureTextEntry);

  const toggleSecureEntry = () => {
    setIsSecure(!isSecure);
  };

  const handleChange = (inputText: string) => {
    setText(inputText);
    onChangeText(inputText);
  };

  const inputStyle = secureTextEntry ? styles.inputWithToggle : styles.input;

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={inputStyle}
        placeholder={placeholder}
        onChangeText={handleChange}
        value={text}
        secureTextEntry={isSecure}
      />
      {secureTextEntry && ( // Render if secureTextEntry is true
        <TouchableOpacity onPress={toggleSecureEntry} style={styles.icon}>
          <MaterialCommunityIcons
            name={isSecure ? 'eye-outline' : 'eye-off-outline'}
            size={24}
            color="grey"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default InputField;
