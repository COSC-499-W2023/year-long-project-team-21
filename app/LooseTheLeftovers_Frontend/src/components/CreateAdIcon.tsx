import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TouchableOpacity, Image } from 'react-native';
import { type AllIconProps } from '../common/Types';

/**
 * Icon component.
 *
 * A clickable homeicon component that be used in various parts of the application including tab.
 * Will take you to the create ad screen
 *
 * @component
 * @param {IconProps} props - The props for the Icon component.
 * @param {ImageSourcePropType} props.source - The image source for the icon.
 * @param {number} [props.size=45] - The size of the icon.
 * @param {() => void} props.onPress - Callback function to execute when the icon is pressed.
 * @param {string} [props.testID] - Optional test identifier for the component.
 * @example
 */

//creates the parameters we're sending
type RootStackParamList = {
  Instruction: { name: string };
};

//uses all icon prop for the interface
const CreateAdIcon: React.FC<AllIconProps> = ({ size = 45 }) => {
  //creates a navigation hook
  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList, 'Instruction'>
    >();

  //link to image
  const image = '../assets/ad.png';

  //navigates to instruction and sends parameters
  const goToHomeScreen = () => {
    navigation.navigate('Instruction', { name: 'CreateAdIcon' });
  };

  //call this to display and icon image. No need to input anything to the component, will automatically
  //set the image size and navigation. Yhis is Good for reusability.
  return (
    <TouchableOpacity onPress={goToHomeScreen} testID={'CreateAdIconTest'}>
      <Image
        source={require(image)}
        style={[{ width: size, height: size }]}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

export default CreateAdIcon;
