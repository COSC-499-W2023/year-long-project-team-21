import React, { useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
interface InputFieldProps {
  placeholder: string;
  onChangeText: (input: string) => void;
  value: string | number;
}

const InputField: React.FC<InputFieldProps> = ({
  placeholder,
  onChangeText,
}) => {
  const [text, setText] = useState('');

  //This updates the input field on UI
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

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: 250,
    borderColor: 'gray',
    borderWidth: 1,
  },

  space: {
    height: 10,
  },
});
export default InputField;
