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
    fontSize: LogoSize || 30, // can use defualt or the size
  };

  return (
    <View>
      <Text style={styles.greyText}>
        Lose
        <Text style={(styles.yellowText, logoStyles)}>the</Text>
        Leftovers
      </Text>
    </View>
  );
};

export default Logo;
