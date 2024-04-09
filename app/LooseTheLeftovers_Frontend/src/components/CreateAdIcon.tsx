import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { type AllIconProps } from '../common/Types';
import { global } from '../common/global_styles';

/**
 * Icon component.
 *
 * A clickable CreateAdIcon component that be used in various parts of the application including tab.
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
const CreateAdIcon: React.FC<AllIconProps> = ({ size = 50 }) => {
  // Creates a navigation hook
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'CreateAd'>>();

  // Navigates to CreateAd and sends parameters
  const goToCreateAd = () => {
    navigation.navigate('CreateAd', { name: 'CreateAdIcon' });
  };

  // Call this to display an icon image. No need to input anything to the component, will automatically
  // set the image size and navigation
  return (
    <TouchableOpacity onPress={goToCreateAd} testID={'CreateAdIconTest'}>
      <Icon name='plus-circle' size={size} style={[{ color: global.primary }]}/>
    </TouchableOpacity>
  );
};

export default CreateAdIcon;
