import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/logoStyles';

/**
 * Logo Props interface for the Logo component.
 *
 * @interface
 * @property {string} Logo - Text to be displayed as the logo.
 */
interface LogoProps {
  Logo: string;
}

/**
 * Logo component.
 *
 * @component
 * @param {LogoProps} props - The props for the Logo component.
 *
 */
const Logo: React.FC<LogoProps> = ({}) => {
  return (
    <View>
      <Text style={styles.greyText}>
        Lose
        <Text style={styles.yellowText}>the</Text>
        Leftovers
      </Text>
    </View>
  );
};

export default Logo;
