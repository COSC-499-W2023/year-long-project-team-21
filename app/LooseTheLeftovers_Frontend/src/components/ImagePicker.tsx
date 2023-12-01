import React, { useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { global } from '../common/global_styles';

/**
 * ImagePickerButton component.
 *
 * This component provides a button to trigger an image selection process. Upon pressing the button,
 * it opens the device's image library, allowing the user to choose an image. The selected image is then displayed
 * in the component.
 *
 * @component
 * @example
 * return (
 *   <ImagePickerButton />
 * )
 */
const ImagePickerButton = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);

  const handlePress = async () => {
    // Add options for image picker
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
    });

    // Check if the uri is not undefined before updating the state
    if (result.assets && result.assets[0].uri) {
      setImageUri(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress} style={styles.button}>
        <Text style={styles.buttonText}>Pick an image</Text>
      </TouchableOpacity>
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: global.background,
    padding: 10,
    borderRadius: 5,
    borderColor: global.primary,
    borderWidth: 1,
  },
  buttonText: {
    color: global.primary,
    textAlign: 'center',
  },
  image: {
    marginTop: 10,
    width: 100, // Set the width
    height: 100, // Set the height
    borderRadius: 10, // Optional, rounded corners
  },
});

export default ImagePickerButton;
