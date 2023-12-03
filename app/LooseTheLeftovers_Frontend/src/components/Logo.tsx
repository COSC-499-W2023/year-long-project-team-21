import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/logoStyles';
import { type LogoProps } from '../common/Types';

const Logo: React.FC<LogoProps> = ({ LogoSize }) => {
  // If any custom values are passed as props, apply them, default otherwise
  const logoStyles = {
    fontSize: LogoSize || 30,
  };

  return (
    <View style={styles.logoContainer}>
      <Text style={[styles.primary, logoStyles]}>Lose</Text>
      <Text style={[styles.secondary, logoStyles]}>the</Text>
      <Text style={[styles.primary, logoStyles]}>Leftovers</Text>
    </View>
  );
};

export default Logo;
