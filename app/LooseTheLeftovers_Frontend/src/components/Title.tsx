import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/titleStyles';
import { global } from '../common/global_styles';
import { type TitleProps } from '../common/Types';

/**
 * Title component.
 *
 * @component
 * @param {TitleProps} props - The props for the Title component.
 * @param {string} props.title - Text to be displayed as the title.
 * @param {number} props.titleSize - Title size.
 * @param {string} props.titleColor - Title color specification.
 * @param {number} props.position - Specifies position of the Title (top or middle).
 * @param {string} props.testID - Optional test identifier for the component.

 * @example
 * <Title title="My Page Title" />
 */
const Title: React.FC<TitleProps> = ({
  title,
  titleSize,
  titleColor,
  position,
  testID,
}) => {
  //Default/Custom styles for Text component
  const titleStyles = {
    fontSize: titleSize || 25,
    color: titleColor || global.primary,
    marginTop: position == 'top' ? 150 : 0,
  };

  return (
    <View style={[styles.TitleContainer]}>
      <Text style={[styles.TitleText, titleStyles]} testID={testID}>
        {title}
      </Text>
    </View>
  );
};

export default Title;
