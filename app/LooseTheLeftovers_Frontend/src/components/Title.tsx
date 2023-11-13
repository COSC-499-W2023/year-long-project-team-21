import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/titleStyles';

/**
 * TitleProps interface for the Title component.
 *
 * @interface
 * @property {string} title - Text to be displayed as the title.
 * @property {number} titleSize - Text size for the title.
 * @property {string} titleColor - Text color for the title
 * @property {number} position - Text position for the title
 */
interface TitleProps {
  title: string;
  titleSize?: number;
  titleColor?: string;
  position?: number;
  pad?: number;
}
/**
 * Title component.
 *
 * @component
 * @param {TitleProps} props - The props for the Title component.
 * @param {string} props.title - Text to be displayed as the title.
 * @param {number} props.titleSize - Title size
 * @param {string} props.titleColor - Title color specification
 * @param {number} props.position - Specifies position of the Title (top or middle)
 * @param {number} props.pad - Specifies position of the Title (top or middle)
 * @example
 * <Title title="My Page Title" />
 */
const Title: React.FC<TitleProps> = ({
  title,
  titleSize,
  titleColor,
  position,
  pad,
}) => {
  //Default/Custom styles for Text component
  const titleStyles = {
    marginTop: position || 50,
    fontSize: titleSize || 25,
    color: titleColor || '#555455',
    padding: pad,
    //marginTop: position == 'top' ? 150 : 0,
  };

  return (
    <View style={[styles.TitleContainer]}>
      <Text style={[styles.TitleText, titleStyles]}>{title}</Text>
    </View>
  );
};

export default Title;
