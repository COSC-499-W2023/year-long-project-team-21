import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/titleStyles';

/**
 * TitleProps interface for the Title component.
 *
 * @interface
 * @property {string} title - Text to be displayed as the title.
 */
interface TitleProps {
  title: string;
}

/**
 * Title component.
 *
 * @component
 * @param {TitleProps} props - The props for the Title component.
 * @param {string} props.title - Text to be displayed as the title.
 *
 * @example
 * <Title title="My Page Title" />
 */
const Title: React.FC<TitleProps> = ({ title }) => {
  return (
    <View style={styles.TitleContainer}>
      <Text style={styles.TitleText}>{title}</Text>
    </View>
  );
};

export default Title;
