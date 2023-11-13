import { TouchableOpacity, Text, View, SafeAreaView } from 'react-native';
import styles from '../styles/buttonStyles';
import React from 'react';

/**
 * ButtonProps interface for the Button component.
 *
 * @interface
 * @property {() => void} onPress - Callback function executed when the button is pressed.
 * @property {string} title - Text displayed on the button.
 * @property {string} textColor - choose text color
 * @property {number} buttonSize - Choose button size (width)
 * @property {number} textSize - Choose text size
 */
interface ButtonProps {
  onPress: () => void;
  title: string;
  textColor?: string;
  borderColor?: string;
  buttonSize?: number;
  textSize?: number;
}

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
 * @example
 * <Button onPress={() => console.log('Button Pressed!')} title="Click Me" />
 */
const Button: React.FC<ButtonProps> = ({onPress, title, textColor, borderColor, textSize, buttonSize}) => {
 
  //Set Default/Custom Button style
  const buttonStyles = {
    backgroundColor: 'white', // You can set a default background color or remove this line
    borderColor: borderColor || '#ffb800', // Use the provided borderColor or a default value
    width: buttonSize || 250, // Use the provided buttonSize or a default value
  };

  //Set Default/Custom Button style
  const textStyles = {
    color: textColor || '#555455', // Use the provided textColor or a default value
    fontSize: textSize || 25, // Use the provided textSize or a default value
  }

  return (
    <>
      <View style={styles.space} />
      <TouchableOpacity style={[styles.button,buttonStyles]} onPress={onPress}>
        <Text style={[styles.buttonText, textStyles]}>{title}</Text>
      </TouchableOpacity>
    </>
  );
};

export default Button;
