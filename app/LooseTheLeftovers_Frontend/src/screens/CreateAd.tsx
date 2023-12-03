import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import { global } from '../common/global_styles';
import styles from '../styles/createAdStyles';
import { AdDataProps } from '../common/Types';

import Header from '../components/UpperBar';
import Texts from '../components/Text';
import ImagePickerButton from '../components/ImagePicker';
import InputField from '../components/InputField';
import ExpirySlider from '../components/ExpirySlider';
import Button from '../components/Button';

const CreateAd = ({ navigation }: { navigation: any }) => {
  const [adData, setAdData] = useState<AdDataProps>({
    title: '',
    description: '',
    imageUri: null,
    expiry: 1,
  });

  // Update the title in ad data
  const handleSetTitle = (newTitle: string) =>
    setAdData(prevAdData => ({ ...prevAdData, title: newTitle }));
  // Update the description in ad data
  const handleSetDescription = (newDescription: string) =>
    setAdData(prevAdData => ({ ...prevAdData, description: newDescription }));
  // Update the image URI in ad data
  const handleSetImageUri = (newImageUri: string | null) =>
    setAdData(prevAdData => ({ ...prevAdData, imageUri: newImageUri }));
  // Update the expiry date in ad data
  const handleSetExpiry = (newExpiry: number) =>
    setAdData(prevAdData => ({ ...prevAdData, expiry: newExpiry }));

  // Handle Submit press
  const handleSubmit = async () => {
    const jwtToken = await retrieveJWTToken(); // Get JWT from encrypted storage
    if (!jwtToken) {
      console.error('No token found');
      return;
    }

    const url = 'create_ad_url';
    const adDataToSubmit = composeAdData(adData);

    const result = await sendPostRequest(url, adDataToSubmit, jwtToken);
    if (result.success) {
      // Cache to DB
      // Navigate to Home screen
    } else {
      // Handle error
    }
  };

  const sendPostRequest = async (
    url: string,
    data: {
      title: string;
      description: string;
      category: string;
      expiry_datetime: string;
      image: string | null;
    },
    token: string,
  ) => {
    try {
      const response = await axios.post(url, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        console.log('Success:', response.data);
        return { success: true, data: response.data };
      } else {
        console.error('Request completed, but failed:', response);
        return { success: false, error: response };
      }
    } catch (error) {
      console.error('An error occurred:', error);
      return { success: false, error };
    }
  };

  const retrieveJWTToken = async () => {
    try {
      const jwtToken = await EncryptedStorage.getItem('user_token');
      if (!jwtToken) {
        console.error('No JWT token found');
        return null;
      }
      return jwtToken;
    } catch (error) {
      console.error('Error retrieving JWT token:', error);
      return null;
    }
  };

  // Convert Slider Value into future expiry date
  const convertExpiryToDatetime = (expiry: number) => {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + expiry);
    return expiryDate.toISOString();
  };

  // Compose JSON
  const composeAdData = (adData: {
    title: string;
    description: string;
    expiry: number;
    imageUri: string | null;
  }) => {
    return {
      title: adData.title,
      description: adData.description,
      category: 'Food',
      expiry_datetime: convertExpiryToDatetime(adData.expiry),
      image: adData.imageUri, // Implement encoding later
    };
  };

  // Placeholder function for header onPress
  const handleBackPress = () => {
    console.log('Back button pressed');
  }; // Go back to previous screen

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Header
        onLeftPress={handleBackPress}
        leftIconSource={require('../assets/plus_white.png')}
      />
      <ScrollView contentContainerStyle={styles.formContainer}>
        {/* Title */}
        <View style={styles.leftAlignedText}>
          <Texts
            texts="Food Name"
            textsSize={22}
            textsColor={global.secondary}
            textsWeight="bold"
          />
        </View>
        <InputField
          placeholder="Title"
          onChangeText={newTitle => handleSetTitle(newTitle)}
          value={adData.title}
          width="100%"
        />

        {/* Description */}
        <View style={styles.leftAlignedText}>
          <Texts
            texts="Description (optional)"
            textsSize={22}
            textsColor={global.secondary}
            textsWeight="bold"
          />
        </View>
        <InputField
          placeholder="Description"
          onChangeText={newDescription => handleSetDescription(newDescription)}
          value={adData.description}
          multiline={true}
          width="100%"
        />

        {/* ImagePicker */}
        <View style={styles.leftAlignedText}>
          <Texts
            texts="Pick an image of the food"
            textsSize={22}
            textsColor={global.secondary}
            textsWeight="bold"
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
            textsWeight="bold"
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

export default CreateAd;
