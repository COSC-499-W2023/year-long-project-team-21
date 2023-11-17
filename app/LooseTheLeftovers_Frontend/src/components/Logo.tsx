import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/logoStyles';
import { type LogoProps } from '../common/Types';

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
