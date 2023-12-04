import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { global } from '../common/global_styles';
import styles from '../styles/textStyles';
import { type TextsProps } from '../common/Types';



/**
 * Text component.
 *
 * * @component
 *
 * @param {TextsProps} props - The props for the Text component.
 * @param {string} props.texts - Text to be displayed as the Text.
 * @param {number} props.textsSize - Text size.
 * @param {string} props.textsColor - Color specification.
 * @param {string} props.textsWeight - Text weight.
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
  textsWeight,
  position,
  onPress,
  testID,
  position
}) => {
  // Default/Custom styles for Text component
  // If any custom values are passed as props, apply them, default otherwise
  const textsStyles = {
    fontSize: textsSize || 25,
    color: textsColor || global.primary,
    fontWeight: textsWeight || 'normal',
    marginTop: position == 'top' ? 150 : 0,
  };

  return (
    <Pressable onPress={onPress}>
      <View style={styles.TitleContainer}>
        <Text style={[styles.TitleText, textsStyles]} testID={testID}>
          {texts}
        </Text>
      </View>
    </Pressable>
  );
};

export default Texts;
