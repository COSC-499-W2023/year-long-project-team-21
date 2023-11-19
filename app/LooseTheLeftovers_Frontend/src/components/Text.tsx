import React from 'react';

import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/textStyles';
import { type TextsProps } from '../common/Types';



/**
 * Text component.
 *
 * * @component
 *
 * @param {TextsProps} props - The props for the Text component.
 * @param {string} props.texts - Text to be displayed as the Text.
 * @param {number} props.textsSize - Text size
 * @param {string} props.textsColor color specification
 * @param {string} props.position - Determines Text position
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
  // Default/Custom styles for Text component
  const textsStyles = {
    fontSize: textsSize || 25,
    color: textsColor || global.primary,
    marginTop: position == 'top' ? 150 : 0,
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
