import React, { useEffect, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { global } from '../common/global_styles';
import Icon from '../components/Icon';
import { Animated, StyleSheet, Text, ActivityIndicator } from 'react-native';


const SplashScreen = () => {
  const fadeAnim = useState(new Animated.Value(0))[0]; // Initial opacity is 0
  const [pun, setPun] = useState('');

  // Define an array of puns
  const puns = [
    "We're on a roll, just loafing around.",
    "Lettuce turnip the beet!",
    "Peas romaine calm and carrot on.",
    "This is how we roll: with lots of thyme.",
    "Orange you glad we're not out of puns?",
    "Don't go bacon my heart!",
    "Lime yours forever.",
    "Just beet it!",
    "Olive you from my head tomatoes.",
    "I yam what I yam.",
  ];

  useEffect(() => {
    // Select a random pun from the array
    const randomPun = puns[Math.floor(Math.random() * puns.length)];
    setPun(randomPun);

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
        <Icon
          source={require('../assets/logo-with-name.png')}
          size={200}
        />
        {/* ActivityIndicator added here */}
        <ActivityIndicator size="large" color="#FFFFFF" />
        {/* Display the randomly selected pun */}
        <Text style={styles.loadingText}>{pun}</Text>
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
