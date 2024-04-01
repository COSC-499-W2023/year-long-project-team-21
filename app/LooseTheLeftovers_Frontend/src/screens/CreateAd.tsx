import React, { useState } from 'react';
import { View, ScrollView, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { global } from '../common/global_styles';
import styles from '../styles/createAdStyles';
import { AdDataProps } from '../common/Types';
import { SecureAPIReq } from '../common/NetworkRequest';
import { adEndpoint } from '../common/API';
import { SelectList } from 'react-native-dropdown-select-list';

import Header from '../components/UpperBar';
import Texts from '../components/Text';
import ImagePickerButton from '../components/ImagePicker';
import InputField from '../components/InputField';
import ExpirySlider from '../components/ExpirySlider';
import Button from '../components/Button';
import Icon from '../components/Icon';

const CreateAd = ({ navigation }: { navigation: any }) => {
  const [expiryEnabled, setExpiryEnabled] = useState(true);
  const [networkError, setNetworkError] = useState('');
  const [fieldError, setFieldError] = useState({
    titleError: '',
    categoryError: '',
    imageError: '',
  });

  const [adData, setAdData] = useState<AdDataProps>({
    title: '',
    description: '',
    category: '',
    expiry: '',
    image: '',
    color: '',
  });

  const categories = [
    { key: 'none', value: 'None' },
    { key: 'vegan', value: 'Vegan' },
    { key: 'gluten free', value: 'Gluten-free' },
    { key: 'peanut free', value: 'Peanut-free' },
  ];

  // Default RN switch won't allow to pass styles for it
  const switchColors = {
    trackFalse: global.tertiary,
    trackTrue: global.tertiary,
    thumbFalse: global.secondary,
    thumbTrue: global.primary,
  };

  const handleFieldChange = (
    field: keyof AdDataProps,
    value: string | number | null,
  ) => {
    setAdData(prevAdData => ({
      ...prevAdData,
      [field]: field === 'image' && value === null ? '' : value, // Handle image null case
    }));

    // Reset error for the field edited
    setFieldError(prevErrors => ({
      ...prevErrors,
      [`${field}Error`]: '',
    }));
  };

  const validateInputs = () => {
    let isValid = true;
    const errors = {
      titleError: '',
      categoryError: '',
      imageError: '',
    };

    if (adData.title === '') {
      errors.titleError = 'Please provide a title for your ad.';
      isValid = false;
    }
    if (adData.category === '') {
      errors.categoryError = 'Please select a category for your ad.';
      isValid = false;
    }
    if (adData.image === '') {
      errors.imageError = 'Please add an image for your ad.';
      isValid = false;
    }

    setFieldError(errors);
    return isValid;
  };

  // Handle Submit press
  const handleSubmit = async () => {
    if (validateInputs()) {
      const formData = createFormData(adData);
      setNetworkError('');

      SecureAPIReq.createInstance()
        .then(async newReq => {
          const res = await newReq.post(adEndpoint, formData);
          statusHandler(res.status);
        })
        .catch(e => {
          if (e.response?.status) {
            // If a status code is available
            statusHandler(e.response?.status);
          } else {
            // General error
            setNetworkError(e.message || 'An unexpected error occurred.');
          }
        });
    }
  };

  const statusHandler = (status: number) => {
    switch (status) {
      case 201:
        navigation.navigate('Done'); // Navigate to profile or success page
        break;
      case 401:
        setNetworkError('Unauthorized, force user to login.');
        break;
      case 400:
        setNetworkError('Bad request - Check the submitted data.');
        break;
      default:
        setNetworkError(`Network error: ${status}`);
        break;
    }
  };

  const createFormData = (adData: AdDataProps) => {
    const formData = new FormData();

    // Text fields
    formData.append('title', adData.title);
    formData.append('description', adData.description);
    formData.append('category', adData.category);

    // Adding expiry if enabled
    if (expiryEnabled) {
      formData.append('expiry', adData.expiry);
    }

    // Adding image if it exists
    if (adData.image) {
      const filename = adData.image.split('/').pop();
      const match = /\.(\w+)$/.exec(filename ?? '');
      const type = match ? `image/${match[1]}` : `image`;

      formData.append('image', {
        uri: adData.image,
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

  const goBack = () => {
    navigation.goBack();
  }
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Header leftIconSource= {require("../assets/back_arrow_white.png")} onLeftPress = {goBack} title="Create Post" />

      <ScrollView>
        <View style={styles.formContainer}>
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
            placeholder="Title "
            onChangeText={newTitle => handleFieldChange('title', newTitle)}
            value={adData.title}
            width="100%"
            maxLength={50}
          />
          {fieldError.titleError !== '' && (
            <Texts
              texts={fieldError.titleError} // Pass error message
              textsSize={14}
              textsColor="red"
              testID="error-msg"
            />
          )}

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
            maxLength={200}
          />

          {/* Category */}
          <View style={styles.leftAlignedText}>
            <Texts
              texts="Category"
              textsSize={22}
              textsColor={global.secondary}
              textsWeight="bold"
            />
          </View>
          <SelectList
            setSelected={(newCategory: string) =>
              handleFieldChange('category', newCategory)
            }
            data={categories}
            save="value"
            search={false}
            placeholder="Select category"
            boxStyles={styles.boxStyles}
            inputStyles={styles.inputStyles}
            dropdownStyles={styles.dropdownStyles}
            dropdownTextStyles={styles.dropdownTextStyles}
            arrowicon={
              <Icon source={require('../assets/drop_3.png')} size={13} />
            }
          />
          {fieldError.categoryError !== '' && (
            <Texts
              texts={fieldError.categoryError} // Pass error message
              textsSize={14}
              textsColor="red"
              testID="error-msg"
            />
          )}

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
              onImagePicked={newimage => handleFieldChange('image', newimage)}
            />
          </View>
          {fieldError.imageError !== '' && (
            <Texts
              texts={fieldError.imageError} // Pass error message
              textsSize={14}
              textsColor="red"
              testID="error-msg"
            />
          )}

          {/* Expiry */}
          <View style={styles.expirySection}>
            <View style={styles.expiryTitleContainer}>
              <Texts
                texts="Set an expiry range"
                textsSize={22}
                textsColor={global.secondary}
                textsWeight="bold"
              />
              <Switch
                trackColor={{
                  false: switchColors.trackFalse,
                  true: switchColors.trackTrue,
                }}
                thumbColor={
                  expiryEnabled
                    ? switchColors.thumbTrue
                    : switchColors.thumbFalse
                }
                onValueChange={() => setExpiryEnabled(prevState => !prevState)}
                value={expiryEnabled}
                style={styles.switchStyle}
                testID="switch-test"
              />
            </View>
            {expiryEnabled && (
              <View style={styles.expirySliderContainer}>
                <ExpirySlider
                  onExpiryChange={handleExpiryChange}
                  testID="slider-test"
                />
              </View>
            )}
          </View>

          {/* Submit Button */}
          <View style={styles.buttonContainer}>
            {networkError !== '' && (
              <View style={styles.networkError}>
                <Texts
                  texts={networkError} // Pass error message
                  textsSize={14}
                  textsColor="red"
                  testID="error-msg"
                />
              </View>
            )}
            <Button title="Submit" onPress={handleSubmit} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateAd;
