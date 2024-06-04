import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { type AllIconProps } from '../common/Types';

/**
 * Icon component.
 *
 * A clickable AccountIcon component that be used in various parts of the application including tab.
 * Will take you to the Profile screen.
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
  Profile: { name: string };
};

// Uses all icon prop for the interface
const AccountIcon: React.FC<AllIconProps> = ({ size = 32 }) => {
  // Creates a navigation hook
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'Profile'>>();

  // Navigates to Profile and sends parameters
  const goToProfileScreen = () => {
    navigation.navigate('Profile', { name: 'AccountIcon' });
  };

  // Call this to display and icon image. No need to input anything to the component, will automatically
  // set the image size and navigation
  return (
    <TouchableOpacity onPress={goToProfileScreen} testID={'AccountIconTest'}>
      <Icon name='account-circle' size={size} style={[{ color: 'white' }]} />
    </TouchableOpacity>
  );
};

export default AccountIcon;
