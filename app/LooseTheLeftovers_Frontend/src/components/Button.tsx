import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import styles from '../styles/buttonStyles';
import { global } from '../common/global_styles';
import { type ButtonProps } from '../common/Types';

/**
 * Button component.
 *
 * @component
 * @param {ButtonProps} props - The props for the Button component.
 * @param {() => void} props.onPress - Callback function to execute when the button is pressed.
 * @param {string} props.title - Text to display on the button.
 * @param {string} props.textColor - Text color in a Button component (defult:#555455)
 * @param {string} props.borderColor - Border color for a Button component (defult: #ffb800)
 * @param {number} props.buttonSize - change Button width (size)
 * @param {number} props.textSize - change text font size in a Button.
 * @param {string} props.testID - specify the testID for button
 * @example
 * <Button onPress={() => console.log('Button Pressed!')} title="Click Me" />
 */
const Button: React.FC<ButtonProps> = ({
  backgroundcolor,
  onPress,
  title,
  textColor,
  borderColor,
  textSize,
  buttonSize,
  testID,
}) => {
  // If any custom values are passed as props, apply them, default otherwise
  // Set Default/Custom Button style
  const buttonStyles = {
    backgroundColor: backgroundcolor || global.primary, // You can set a default background color or remove this line
    borderColor: borderColor || global.background, // Use the provided borderColor or a default value
    width: buttonSize || 250, // Use the provided buttonSize or a default value
  };

  // Set Default/Custom Button style
  const textStyles = {
    color: textColor || global.secondary, // Use the provided textColor or a default value
    fontSize: textSize || 21, // Use the provided textSize or a default value
  };

  return (
      <TouchableOpacity
        style={[styles.button, buttonStyles]}
        onPress={onPress}
        testID={testID}>
        <Text style={[styles.buttonText, textStyles]}>{title}</Text>
      </TouchableOpacity>
  );
};

export default Button;
