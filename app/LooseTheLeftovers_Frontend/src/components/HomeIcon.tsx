import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { type AllIconProps } from '../common/Types';

/**
 * Icon component.
 *
 * A clickable HomeIcon component that be used in various parts of the application including tab.
 * Will take you to the Home screen.
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
  Home: { name: string };
};

// Uses all icon prop for the interface
const HomeIcon: React.FC<AllIconProps> = ({ size = 28 }) => {
  // Creates a navigation hook
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'Home'>>();

  // Navigates to Home and sends parameters
  const goToHomeScreen = () => {
    navigation.navigate('Home', { name: 'HomeIcon' });
  };

  // Call this to display and icon image. No need to input anything to the component, will automatically
  //set the image size and navigation
  return (
    <TouchableOpacity onPress={goToHomeScreen} testID={'HomeIconTest'}>
      <Icon name='home' size={size} style={[{ color: 'white' }]} />
    </TouchableOpacity>
  );
};

export default HomeIcon;
