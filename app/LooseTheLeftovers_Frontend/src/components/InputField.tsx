import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../styles/inputFieldStyles';
import { global } from '../common/global_styles';
import { type InputFieldProps } from '../common/Types';

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
 * @param {boolean} multiline - Optional prop to make InputField multiline, capped at 10.
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
  multiline,
  width,
}) => {
  const [text, setText] = useState('');
  const [isSecure, setIsSecure] = useState(secureTextEntry);

  // Toggle the state of isSecure, controls the visibility of the password
  const toggleSecureEntry = () => {
    setIsSecure(!isSecure);
  };

  const handleChange = (inputText: string) => {
    setText(inputText);
    onChangeText(inputText);
  };

  // If secureEntry is true, apply styling with visibility toggle button
  const inputStyle = secureTextEntry ? styles.inputWithToggle : styles.input;

  const widthStyle = width ? { width: typeof width === 'number' ? width : 'auto' } : {};

  const combinedInputContainerStyle: StyleProp<ViewStyle> = {
    ...styles.inputContainer,
    ...widthStyle,
  };

  return (
    <View style={combinedInputContainerStyle}>
      <TextInput
        style={inputStyle}
        placeholder={placeholder}
        onChangeText={handleChange}
        value={text}
        secureTextEntry={isSecure} // Determine if the text should be obscured
        placeholderTextColor={global.secondary}
        multiline={multiline}
        numberOfLines={multiline ? 3 : 1} // Default is one-line
        textAlignVertical={multiline ? 'top' : 'center'} // Align text to the top for multiline
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
