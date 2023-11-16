import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import styles from '../styles/buttonStyles';

/**
 * ButtonProps interface for the Button component.
 *
 * @interface
 * @property {() => void} onPress - Callback function executed when the button is pressed.
 * @property {string} title - Text displayed on the button.
 * @property {string} textColor - Choose text color.
 * @property {string} borderColor - Choose border color.
 * @property {string} backgroundColor - Choose Button background color.
 * @property {number} buttonSize - Choose button size (width).
 * @property {number} textSize - Choose text size.
 * @property {string} testID - Used to identify an element in testing.
 */
interface ButtonProps {
  onPress: () => void;
  title: string;
  textColor?: string;
  borderColor?: string;
  backgroundColor?: string;
  buttonSize?: number;
  textSize?: number;
  testID?: string;
}

/**
 * Button component.
 *
 * @component
 * @param {ButtonProps} props - The props for the Button component.
 * @param {() => void} props.onPress - Callback function to execute when the button is pressed.
 * @param {string} props.title - Text to display on the button.
 * @param {string} props.textColor - Text color in a Button component (default: #555455).
 * @param {string} props.borderColor - Border color for a Button component (default: #ffb800).
 * @param {string} props.backgroundColor - Background color for a Button (default: white).
 * @param {number} props.textSize - Change text font size in a Button.
 * @param {number} props.buttonSize - Change Button width (size).
 * @param {string} props.testID - Identify Button in testing.
 * @example
 * <Button onPress={() => console.log('Button Pressed!')} title="Click Me" />
 */
const Button: React.FC<ButtonProps> = ({
  onPress,
  title,
  textColor,
  borderColor,
  backgroundColor,
  textSize,
  buttonSize,
  testID,
}) => {
  // If any custom values are passed as props, apply them, default otherwise
  // Set Default/Custom Button style
  const buttonStyles = {
    backgroundColor: backgroundColor || 'white', // You can set a default background color or remove this line
    borderColor: borderColor || '#ffb800', // Use the provided borderColor or a default value
    width: buttonSize || 250, // Use the provided buttonSize or a default value
  };

  // Set Default/Custom Button style
  const textStyles = {
    color: textColor || '#555455', // Use the provided textColor or a default value
    fontSize: textSize || 25, // Use the provided textSize or a default value
  };

  return (
    <>
      <View style={styles.space} />
      <TouchableOpacity
        style={[styles.button, buttonStyles]}
        onPress={onPress}
        testID={testID}>
        <Text style={[styles.buttonText, textStyles]}>{title}</Text>
      </TouchableOpacity>
    </>
  );
};

export default Button;
