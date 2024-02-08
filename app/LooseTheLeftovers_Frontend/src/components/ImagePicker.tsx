import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import styles from '../styles/imagePickerStyles';
import { type ImagePickerButtonProps } from '../common/Types';

/**
 * ImagePickerButton component.
 *
 * This component provides two buttons to trigger an image selection process. Upon pressing 'Open Gallery' button,
 * it opens the device's image library, allowing the user to choose an image. Pressing 'Open Camera' button opens 
 * device's camera in app, allowing to take a single picture. The selected image is then displayed in the component.
 *
 * @component
 * @example
 * return (
 *   <ImagePickerButton />
 * )
 */
const ImagePickerButton: React.FC<ImagePickerButtonProps> = ({
  onImagePicked,
}) => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const pickerTest = 'image-picker';
  const galleryTest = 'gallery-test';
  const cameraTest = 'camera-test';
  const imageTest = 'selected-image';

  const handleImagePick = async (launchFunction: any) => {
    const result = await launchFunction({
      mediaType: 'photo',
      quality: 1,
    });

    if (result.assets && result.assets[0].uri) {
      setImageUri(result.assets[0].uri);
      onImagePicked(result.assets[0].uri);
    }
  };

  // Same handling logic, different functions to call
  const openGallery = () => handleImagePick(launchImageLibrary);
  const openCamera = () => handleImagePick(launchCamera);

  return (
    <View style={styles.container} testID={pickerTest}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={openGallery}
          style={styles.button}
          testID={galleryTest}>
          <Text style={styles.buttonText}>Open Gallery</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={openCamera}
          style={styles.button}
          testID={cameraTest}>
          <Text style={styles.buttonText}>Open Camera</Text>
        </TouchableOpacity>
      </View>
      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          style={styles.image}
          testID={imageTest}
        />
      )}
    </View>
  );
};

export default ImagePickerButton;
