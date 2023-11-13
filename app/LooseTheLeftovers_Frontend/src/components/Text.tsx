import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/titleStyles';
import { TouchableOpacity } from 'react-native';

/**
 * TextProps interface for the Text component.
 *
 * @interface
 * @property {string} texts -  displays the Text.
 * @property {number} textxSize -changes the text size
 * @property {() => void} onPress - Callback function executed when the button is pressed.
 */
interface TextsProps {
  texts: string;
  textsSize?: number;
  textsColor?: string;
  position?: number;
  onPress?: () => void;
  pad?: number;
}

/**
 * Text component.
 *
 * * @component
 *
 * @param {TextsProps} props - The props for the Text component.
 * @param {string} props.texts - Text to be displayed as the Text.
 * @param {number} props.textsSize - Text size
 * @param {string} props.textxColor color specification
 * @param {number} props.position - Determines Text position
 * @param {number} props.pad - Determines Text position
 * @param {() => void} props.onPress - Callback function to execute when the button is pressed.
 * @example
 * <Texts texts="Words" />
 */

const Texts: React.FC<TextsProps> = ({
  texts,
  textsSize,
  textsColor,
  position,
  onPress,
  pad,
}) => {
  //Default/Custom styles for Text component
  const textsStyles = {
    fontSize: textsSize || 25,
    color: textsColor || '#555455',
    marginTop: position || 200,
    padding: pad || 20,
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.TitleContainer}>
        <Text style={[styles.TitleText, textsStyles]}>{texts}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Texts;
