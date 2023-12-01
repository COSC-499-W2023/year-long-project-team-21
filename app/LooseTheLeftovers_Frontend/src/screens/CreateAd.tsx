import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { global } from '../common/global_styles';

import Header from '../components/UpperBar';
import ImagePickerButton from '../components/ImagePicker';
import InputField from '../components/InputField';
import ExpirySlider from '../components/ExpirySlider';
import Button from '../components/Button';

const ShellPage = () => {
  // Placeholder functions for onPress events
  const handleBackPress = () => {
    console.log('Back button pressed');
  };

  const handleQuitPress = () => {
    console.log('Quit button pressed');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Header
        onBackPress={handleBackPress}
        onQuitPress={handleQuitPress}
        backIconSource={require('../assets/ad.png')}
        quitIconSource={require('../assets/home.png')}
      />
      <View style={styles.contentContainer}>
        {/* Data Entry Component */}
        <View style={styles.navigationContainer}>
          {/* Placeholder for Navigation Buttons */}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: global.background,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
    paddingHorizontal: 20,
  },
  navigationContainer: {
    // Styles for navigation container
  },
});

export default ShellPage;
