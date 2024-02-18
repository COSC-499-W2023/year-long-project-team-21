import React, { useEffect, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { global } from '../common/global_styles';
import Icon from '../components/Icon';
import { Animated, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { checkHasLaunched } from '../common/EncryptedSession';
import { defaultThemesByVersion } from 'react-native-paper/lib/typescript/core/theming';


const SplashScreen = ({ navigation }: { navigation: any }) => {
  const [firstLaunch, setFirstLaunch] = useState<boolean | null>(null);
  const fadeAnim = useState(new Animated.Value(0))[0]; 
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [pun, setPun] = useState('');

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

  const displayPun = () => { 
    const randomPun = puns[Math.floor(Math.random() * puns.length)];
    setPun(randomPun);
  }

  const navAfterWait = (destination: string, timeout: number) => {
    setTimeout(() => {
      navigation.navigate(destination, { firstLaunch: firstLaunch });
    }, timeout);                           // 2500 
  }

  const checkLaunch = async () => {
    try{
      // check if the app has been launched before and set state accordingly
      const hasLaunched = await checkHasLaunched();
      hasLaunched ? setFirstLaunch(false) : setFirstLaunch(true);
    }
    catch(e){
      // if an error arises, display on the screen 
      const errorMessage = (e instanceof Error) ? e.message : String(e);
      console.error(errorMessage)
      setError(errorMessage);
    }
    finally{
      setLoading(false);
    }
  }

  const entranceAnimation = () => { 
    Animated.timing(fadeAnim, {
      toValue: 1, // Final opacity value
      duration: 1000,
      useNativeDriver: true, // Enables native driver for smoother animations
    }).start();
  }


  // on component mount 
  useEffect(() => {
    displayPun();
    entranceAnimation();
    checkLaunch();
  }, [fadeAnim]);

  // after needed data is loading to check location services 
  useEffect(() => { 
    if(!loading && !error){

      if(firstLaunch){
        // check if user wants to enable location services
      }
      else{
        // check if location services are disabled 
        // check if location services are saved to the phone 
        // if they are now disabled and saved to the phone, delete from cache to respect user's privacy. 
        

        // if location services are enabled, 
      }

      //navAfterWait("Login", 2000);
    }
  }, [loading])

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
        <ActivityIndicator size="large" color="#FFFFFF" />
        {error ? (
          <Text style={styles.errorText}>{error}</Text> 
        ) : (
          <Text style={styles.loadingText}>{pun}</Text> 
        )}
      </LinearGradient>
    </Animated.View>
  );
};

// You might need to adjust or add to your existing styles
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
  errorText: {
    marginTop: 20,
    fontSize: 20,
    color: 'red', // Example error text color
  },
});

export default SplashScreen;