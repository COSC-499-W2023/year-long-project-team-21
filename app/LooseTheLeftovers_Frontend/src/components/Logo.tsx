import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/logoStyles';

/**
 * Logo Props interface for the logo component.
 *
 * @interface
 * @param {number} props.LogoSize - change the size of a logo
 */
interface LogoProps {
  LogoSize?: number;
}

/**
 * Logo component.
 *
 * @component
 * @param {LogoProps} props - The props for the Logo component.
 *
 *
 */
const Logo: React.FC<LogoProps> = ({ LogoSize }) => {
  const logoStyles = {
    fontSize: LogoSize || 30,
  };

  return (
    <View style={styles.logoContainer}>
      <Text style={[styles.greyText, logoStyles]}>Lose</Text>
      <Text style={[styles.yellowText, logoStyles]}>the</Text>
      <Text style={[styles.greyText, logoStyles]}>Leftovers</Text>
    </View>
  );
};

export default Logo;
