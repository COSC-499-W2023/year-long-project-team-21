import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { global } from '../common/global_styles';
import styles from '../styles/createAdStyles';
import { AdDataProps } from '../common/Types';
import { SecureAPIReq } from '../common/NetworkRequest';
import { createAd } from '../common/API';

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
    category: '',
    expiry: 1,
    imageUri: '',
  });

  const handleFieldChange = (
    field: keyof AdDataProps,
    value: string | number | null,
  ) => {
    setAdData(prevAdData => ({
      ...prevAdData,
      [field]: field === 'imageUri' && value === null ? '' : value, // Handle imageUri null case
    }));
  };

  // Handle Submit press
  const handleSubmit = async () => {
    const formData = createFormData(adData);

    SecureAPIReq.createInstance()
      .then(async newReq => {
        const res = await newReq.post(createAd, formData);
        statusHandler(res.status);
      })
      .catch(e => {
        if (e.response?.status) {
          // If a status code is available
          statusHandler(e.response?.status);
        } else {
          // General error
          console.error('An error occurred:', e.message);
        }
      });
  };

  const statusHandler = (status: number) => {
    switch (status) {
      case 201:
        console.log('Ad created successfully.');
        // Navigate to profile or success page
        break;
      case 401:
        console.error('Unauthorized, force user to login.');
        // Handle unauthorized access
        break;
      case 400:
        console.error('Bad request - Check the submitted data.');
        // Handle bad request
        break;
      default:
        console.error(`Network error: ${status}`);
        // Other statuses or general error
        break;
    }
  };

  const createFormData = (adData: AdDataProps) => {
    const formData = new FormData();

    // Text fields
    formData.append('title', adData.title);
    formData.append('description', adData.description);
    formData.append('category', 'Food'); // Will be added as a field later
    formData.append('expiry', adData.expiry);

    // Adding image if it exists
    if (adData.imageUri) {
      const filename = adData.imageUri.split('/').pop();
      const match = /\.(\w+)$/.exec(filename ?? '');
      const type = match ? `image/${match[1]}` : `image`;

      formData.append('image', {
        uri: adData.imageUri,
        name: filename ?? 'upload.jpg',
        type,
      });
    }

    return formData;
  };

  const handleExpiryChange = (expiryValue: number) => {
    const expiryDate = convertExpiryToDatetime(expiryValue);
    handleFieldChange('expiry', expiryDate);
  };

  // Convert Slider Value into future expiry date
  const convertExpiryToDatetime = (expiry: number) => {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + expiry);
    return expiryDate.toISOString();
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
          onChangeText={newTitle => handleFieldChange('title', newTitle)}
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
          onChangeText={newDescription =>
            handleFieldChange('description', newDescription)
          }
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
          <ImagePickerButton
            onImagePicked={newImageUri =>
              handleFieldChange('imageUri', newImageUri)
            }
          />
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
          <ExpirySlider onExpiryChange={handleExpiryChange} />
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
