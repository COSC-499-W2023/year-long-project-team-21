import React from 'react';
import { View, Text, Pressable } from 'react-native';
import styles from '../styles/titleStyles';
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
  onPress?: () => void;
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
 * @param {() => void} props.onPress - Callback function to execute when the button is pressed.
 * @example
 * <Texts texts="Words" />
 */

const Texts: React.FC<TextsProps> = ({
  texts,
  textsSize,
  textsColor,
  onPress,
}) => {
  //Default/Custom styles for Text component
  const textsStyles = {
    fontSize: textsSize || 25,
    color: textsColor || '#555455',
  };

  return (
    <Pressable onPress={onPress}>
      <View style={styles.TitleContainer}>
        <Text style={[styles.TitleText, textsStyles]}>{texts}</Text>
      </View>
    </Pressable>
  );
};

export default Texts;
