import React, { useEffect, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { global } from '../common/global_styles';
import Icon from '../components/Icon';
import { Animated, StyleSheet, Text, ActivityIndicator } from 'react-native';
import {
  checkHasLaunched,
  retrieveUserSession,
} from '../common/EncryptedSession';
import { checkLocationPermission } from '../common/LocationServices';
import { useGlobal } from '../common/GlobalContext';
import { View } from 'react-native';
import styles from '../styles/loginStyle';
import splashscreen from '../styles/SplashScreenStyles';

const SplashScreen = ({ navigation }: { navigation: any }) => {
  const { updateFirstLaunch, updateLocationPermission } = useGlobal();
  const fadeAnim = useState(new Animated.Value(0))[0];
  const [error, setError] = useState('');
  const [pun, setPun] = useState('');

  const puns = [
    "We're on a roll, just loafing around.",
    'Lettuce turnip the beet!',
    'Peas romaine calm and carrot on.',
    'This is how we roll: with lots of thyme.',
    "Orange you glad we're not out of puns?",
    "Don't go bacon my heart!",
    'Lime yours forever.',
    'Just beet it!',
    'Olive you from my head tomatoes.',
    'I yam what I yam.',
  ];

  const displayPun = () => {
    const randomPun = puns[Math.floor(Math.random() * puns.length)];
    setPun(randomPun);
  };

  // modify this function to handle either going to Home screen or Login screen
  const navAfterWait = (destination: string, timeout: number) => {
    setTimeout(() => {
      if (!error) {
        navigation.navigate(destination);
      }
    }, timeout); // 2500*/
  };

  // modify this to use global state
  const checkLaunch = async () => {
    try {
      // check if the app has been launched before and set state accordingly
      const hasLaunched = await checkHasLaunched();
      hasLaunched ? updateFirstLaunch(false) : updateFirstLaunch(true);
    } catch (e) {
      // if an error arises, display on the screen
      const errorMessage = e instanceof Error ? e.message : String(e);
      setError(errorMessage);
    }
  };

  const retrieveLocationPerm = async () => {
    let result = await checkLocationPermission();
    if (result instanceof Error) {
      setError(String(result));
    } else {
      // cast to string if not an error
      const finalResult: string = String(result);
      console.log(finalResult);
      updateLocationPermission(finalResult);
    }
  };

  const retrieveUserId = async () => {
    const userSesh: Record<string, string> = await retrieveUserSession();
    const userId: string = userSesh['user_id'];
  };

  const entranceAnimation = () => {
    Animated.timing(fadeAnim, {
      toValue: 1, // Final opacity value
      duration: 500,
      useNativeDriver: true, // Enables native driver for smoother animations
    }).start();
  };

  // on component mount
  useEffect(() => {
    const awaitHandler = async () => {
      displayPun();
      entranceAnimation();
      // run tasks concurrently
      await Promise.all([checkLaunch(), retrieveLocationPerm()]);
      navAfterWait('Login', 1200);
    };
    awaitHandler();
  }, [fadeAnim]);

  return (
    <>
      <Animated.View style={{ ...splashscreen.container, opacity: fadeAnim }}>
        <LinearGradient
          style={styles.LoginContainer}
          colors={[global.purple, global.background]}
          start={{ x: 1, y: 0 }}>
          <Icon source={require('../assets/logo-with-name.png')} size={200} />
          <ActivityIndicator size="large" color="#FFFFFF" />
          {error ? (
            <Text style={splashscreen.errorText}>{error}</Text>
          ) : (
            <Text style={splashscreen.loadingText}>{pun}</Text>
          )}
          <View testID="SplashScreen"></View>
        </LinearGradient>
      </Animated.View>
    </>
  );
};

export default SplashScreen;
