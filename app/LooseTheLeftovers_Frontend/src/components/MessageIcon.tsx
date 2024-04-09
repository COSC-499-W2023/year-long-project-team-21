import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { type AllIconProps } from '../common/Types';
import { useChat } from '../common/ChatContext';

/**
 * Icon component.
 *
 * A clickable MessageIcon component that be used in various parts of the application including tab.
 * Will take you to the ChatList screen.
 *
 * @component
 * @param {IconProps} props - The props for the Icon component.
 * @param {ImageSourcePropType} props.source - The image source for the icon.
 * @param {number} [props.size] - The size of the icon.
 * @param {() => void} props.onPress - Callback function to execute when the icon is pressed.
 * @param {string} [props.testID] - Optional test identifier for the component.
 * @example
 */

// Creates the parameters we're sending
type RootStackParamList = {
  ChatList: { name: string };
};

// Uses all icon prop for the interface
const MessageIcon: React.FC<AllIconProps> = ({ size = 40 }) => {
  const { hasUnread } = useChat();
  // Creates a navigation hook
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'ChatList'>>();

  const dot = require('../assets/bubble-dot.png');
  const noDot = require('../assets/bubble.png');

  // Navigates to ChatList and sends parameters
  const goToChatList = () => {
    navigation.navigate('ChatList', { name: 'MessageIcon' });
  };

  // Call this to display and icon image. No need to input anything to the component, will automatically
  // set the image size and navigations
  return (
    <TouchableOpacity onPress={goToChatList} testID={'MessageIconTest'}>
      <Image
        source={hasUnread ? dot : noDot}
        style={[{ width: size, height: size }]}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

export default MessageIcon;
