import { TouchableOpacity, Text, View } from 'react-native';
import styles from '../styles/buttonStyles';

/**
 * ButtonProps interface for the Button component.
 *
 * @interface
 * @property {() => void} onPress - Callback function executed when the button is pressed.
 * @property {string} title - Text displayed on the button.
 */
interface ButtonProps {
  onPress: () => void;
  title: string;
}

/**
 * Button component.
 *
 * @component
 * @param {ButtonProps} props - The props for the Button component.
 * @param {() => void} props.onPress - Callback function to execute when the button is pressed.
 * @param {string} props.title - Text to display on the button.
 *
 * @example
 * <Button onPress={() => console.log('Button Pressed!')} title="Click Me" />
 */
const Button: React.FC<ButtonProps> = ({ onPress, title }) => {
  return (
    <>
      <View style={styles.space} />
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    </>
  );
};

export default Button;
