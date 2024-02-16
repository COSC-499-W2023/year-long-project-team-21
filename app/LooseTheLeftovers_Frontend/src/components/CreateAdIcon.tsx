import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TouchableOpacity, Image } from 'react-native';
import { type AllIconProps } from '../common/Types';

/**
 * Icon component.
 *
 * A clickable homeicon component that be used in various parts of the application including tab.
 * Takes you to the CreateAd screen.
 *
 * @component
 * @param {IconProps} props - The props for the Icon component.
 * @param {ImageSourcePropType} props.source - The image source for the icon.
 * @param {number} [props.size=45] - The size of the icon.
 * @param {() => void} props.onPress - Callback function to execute when the icon is pressed.
 * @param {string} [props.testID] - Optional test identifier for the component.
 * @example
 */

// Creates the parameters we're sending
type RootStackParamList = {
  CreateAd: { name: string };
};

// Uses all icon prop for the interface
const CreateAdIcon: React.FC<AllIconProps> = ({ size = 48 }) => {
  // Creates a navigation hook
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'CreateAd'>>();


  //link to image
  const image = '../assets/create-ad.png';


  // Navigates to CreateAd and sends parameters
  const goToCreateAd = () => {
    navigation.navigate('CreateAd', { name: 'CreateAdIcon' });
  };

  // Call this to display an icon image. No need to input anything to the component, will automatically
  // set the image size and navigation, good for reusability.
  return (
    <TouchableOpacity onPress={goToCreateAd} testID={'CreateAdIconTest'}>
      <Image
        source={require(image)}
        style={[{ width: size, height: size }]}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

export default CreateAdIcon;
