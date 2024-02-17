import React, { useEffect, useState } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { global } from '../common/global_styles';
import Icon from '../components/Icon';

const SplashScreen = () => {
  const fadeAnim = useState(new Animated.Value(0))[0]; // Initial opacity is 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1, // Final opacity value
      duration: 1000,
      useNativeDriver: true, // Enables native driver for smoother animations
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View style={{...styles.container, opacity: fadeAnim}}>
      <LinearGradient
        style={styles.gradient}
        colors={[global.purple, global.background]}
        start={{ x: 1, y: 0 }}
      >
        {/* Use Icon component with explicit size */}
        <Icon
          source={require('../assets/logo-with-name.png')}
          size={200} // Set the size as needed
          onPress={() => console.log('Icon Pressed')} // Optional onPress, adjust as needed
        />
        <Text style={styles.loadingText}>Loading...</Text>
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 20,
    fontSize: 20,
    color: '#FFFFFF',
  },
});

export default SplashScreen;
