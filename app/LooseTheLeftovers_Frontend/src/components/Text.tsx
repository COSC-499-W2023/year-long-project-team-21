import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/textStyles';

/**
 * TextProps interface for the Text component.
 *
 * @interface
 * @property {string} texts - Displays Text passed to the component.
 * @property {number} textsSize - Changes Text size
 * @property {string} textsColor - Changes Text color.
 * @property {string} position - Changes Text position on the screen.
 * @property {() => void} onPress - Callback function executed when the button is pressed.
 * @property {string} testID - Used to identify an element in testing.
 */
interface TextsProps {
  texts: string;
  textsSize?: number;
  textsColor?: string;
  position?: string;
  onPress?: () => void;
  testID?: string;
}

/**
 * Text component.
 *
 * * @component
 *
 * @param {TextsProps} props - The props for the Text component.
 * @param {string} props.texts - Text to be displayed as the Text.
 * @param {number} props.textsSize - Text size.
 * @param {string} props.textsColor - Color specification.
 * @param {string} props.position - Determines Text position.
 * @param {() => void} props.onPress - Callback function to execute when the button is pressed.
 * @param {string} props.testID - Identify Text in testing.
 * @example
 * <Texts texts="Words" />
 */

const Texts: React.FC<TextsProps> = ({
  texts,
  textsSize,
  textsColor,
  position,
  onPress,
  testID,
}) => {
  // Default/Custom styles for Text component
  // If any custom values are passed as props, apply them, default otherwise
  const textsStyles = {
    fontSize: textsSize || 25,
    color: textsColor || '#555455',
    marginTop: position == 'top' ? 150 : 0,
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.TitleContainer}>
        <Text style={[styles.TitleText, textsStyles]} testID={testID}>{texts}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Texts;
