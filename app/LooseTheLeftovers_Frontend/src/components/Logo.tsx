import React from 'react';
import { View, Image } from 'react-native';
import styles from '../styles/logoStyles';

/**
 * LogoProps interface for the Logo component.
 *
 * @interface
 * @property {string} image - URL of the image to be displayed as the Logo.
 */
interface LogoProps {
  image: string;
}

/**
 * Logo component that displays an image.
 *
 * @component
 * @param {LogoProps} props - The props for the Logo component.
 * @param {string} props.image - URL of the image to be displayed in the Logo.
 *
 * @example
 * <Logo image="https://example.com/logo.jpg" />
 */
const Logo: React.FC<LogoProps> = ({ image }) => {
  return (
    <View style={styles.logo}>
      <Image source={{ uri: image }} style={styles.logo} testID="Logo-image" />
    </View>
  );
};

export default Logo;
