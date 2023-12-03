import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { global } from '../common/global_styles';

import Header from '../components/UpperBar';
import Texts from '../components/Text';
import ImagePickerButton from '../components/ImagePicker';
import InputField from '../components/InputField';
import ExpirySlider from '../components/ExpirySlider';
import Button from '../components/Button';

interface AdData {
  title: string;
  description: string;
  imageUri: string | null; // Assuming imageUri can be a string or null if no image is picked
  expiry: number; // Assuming expiry is a number representing a range of days
}

const CreateAd = () => {
  const [adData, setAdData] = useState<AdData>({
    title: '',
    description: '',
    imageUri: null,
    expiry: 1,
  });

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Handlers for setting ad data
  const handleSetTitle = (title: string) => setAdData({ ...adData, title });
  const handleSetDescription = (description: string) => setAdData({ ...adData, description });
  const handleSetImageUri = (imageUri: string | null) => setAdData({ ...adData, imageUri });
  const handleSetExpiry = (expiry: number) => setAdData({ ...adData, expiry });

  const handleSubmit = () => {
    // Submit the ad data
    console.log(adData);
  };

    // Placeholder functions for header onPress
    const handleBackPress = () => { console.log('Back button pressed'); };
    const handleQuitPress = () => { console.log('Quit button pressed'); };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Header
        onLeftPress={handleBackPress}
        onRightPress={handleQuitPress}
        leftIconSource={require('../assets/plus_white.png')}
      />
      <ScrollView contentContainerStyle={styles.formContainer}>
        {/* Title */}
        <View style={styles.leftAlignedText}>
          <Texts
            texts="Food Name"
            textsSize={22}
            textsColor={global.secondary}
            textsWeight='bold'
          />
        </View>
        <InputField
          placeholder="Title"
          onChangeText={setTitle}
          value={title}
          width="100%"
        />

        {/* Description */}
        <View style={styles.leftAlignedText}>
          <Texts
            texts="Description (optional)"
            textsSize={22}
            textsColor={global.secondary}
            textsWeight='bold'
          />
        </View>
        <InputField
          placeholder="Description"
          onChangeText={setDescription}
          value={description}
          multiline={true}
          width="100%"
        />

        {/* ImagePicker */}
        <View style={styles.leftAlignedText}>
          <Texts
            texts="Pick an image of the food"
            textsSize={22}
            textsColor={global.secondary}
            textsWeight='bold'
          />
        </View>
        <View style={styles.imagePickerContainer}>
          <ImagePickerButton onImagePicked={handleSetImageUri} />
        </View>
        
        {/* Slider */}
        <View style={styles.leftAlignedText}>
          <Texts
            texts="Set an expiry range"
            textsSize={22}
            textsColor={global.secondary}
            textsWeight='bold'
          />
        </View>
        <View style={styles.expirySliderContainer}>
          <ExpirySlider onExpiryChange={handleSetExpiry} />
        </View>
        
        {/* Submit Button */}
        <View style={styles.buttonContainer}>
          <Button title="Submit" onPress={handleSubmit} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: global.background,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 0,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  imagePickerContainer: {
    alignSelf: 'flex-start', // Align ImagePicker to the left
    paddingTop: 15, // Add padding between the ImagePicker and other elements
  },
  expirySliderContainer: {
    paddingTop: 15, // Add padding between the ExpirySlider and other elements
  },
  buttonContainer: {
    alignItems: 'center', // Center align the Done button
    paddingVertical: 30, // Add padding above the Done button
  },
  doneButton: {
    width: '50%', // Make the Done button narrower
    alignSelf: 'center', // Ensure the button is centered
  },
  leftAlignedText: {
    alignSelf: 'flex-start',
    paddingTop: 15, // Add padding above the Done button
  },
});

export default CreateAd;
