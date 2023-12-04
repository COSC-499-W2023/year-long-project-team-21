import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import styles from '../styles/imagePickerStyles';
import { type ImagePickerButtonProps } from '../common/Types';

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
const ImagePickerButton: React.FC<ImagePickerButtonProps> = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const testID = 'image-picker';

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
      <TouchableOpacity
        onPress={handlePress}
        style={styles.button}
        testID={testID}>
        <Text style={styles.buttonText}>Open Gallery</Text>
      </TouchableOpacity>
      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          style={styles.image}
          testID='selected-image'
        />
      )}
    </View>
  );
};

export default ImagePickerButton;
