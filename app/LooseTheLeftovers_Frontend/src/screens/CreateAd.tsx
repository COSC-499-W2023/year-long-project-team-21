import React from 'react';
import { View, StyleSheet } from 'react-native';
import { global } from '../common/global_styles';

import Header from '../components/UpperBar';

const ShellPage = () => {

  // Placeholder functions for onPress events
  const handleBackPress = () => {
    console.log('Back button pressed');
  };

  const handleQuitPress = () => {
    console.log('Quit button pressed');
  };

  return (
    <View style={styles.container}>
      {/* Header Component */}
      <Header
        onBackPress={handleBackPress}
        onQuitPress={handleQuitPress}
        backIconSource={require('../assets/ad.png')}
        quitIconSource={require('../assets/home.png')}
      />
      <View style={styles.contentContainer}>
      {/* Entry Component */}
      <View style={styles.navigationContainer}>
        {/* Placeholder for Navigation Buttons */}
      </View>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: global.background,
  },
  contentContainer: {
    flex: 1,
    // Additional styles for content container
  },
  navigationContainer: {
    // Additional styles for navigation container
  },
});

export default ShellPage;
