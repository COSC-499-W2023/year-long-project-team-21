import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { type AllIconProps } from '../common/Types';

/**
 * Icon component.
 *
 * A clickable MessageIcon component that be used in various parts of the application including tab.
 * Will take you to the ChatList screen.
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
  ChatList: { name: string };
};

// Uses all icon prop for the interface
const MessageIcon: React.FC<AllIconProps> = ({ size = 34 }) => {
  // Creates a navigation hook
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'ChatList'>>();

  // Navigates to ChatList and sends parameters
  const goToChatList = () => {
    navigation.navigate('ChatList', { name: 'MessageIcon' });
  };

  // Call this to display and icon image. No need to input anything to the component, will automatically
  // set the image size and navigation
  return (
    <TouchableOpacity onPress={goToChatList} testID={'MessageIconTest'}>
      <Icon name='chatbubble' size={size} style={[{ color: 'white' }]}/>
    </TouchableOpacity>
  );
};

export default MessageIcon;
