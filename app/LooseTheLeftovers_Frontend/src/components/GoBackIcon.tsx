import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { type AllIconProps } from '../common/Types';

/**
 * Icon component.
 *
 * A clickable GoBackIcon component that be used in various parts of the application including tab.
 * Will take you to the previous screen.
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
  GoBack: { name: string };
};

// Uses all icon prop for the interface
const GoBackIcon: React.FC<AllIconProps> = ({ size = 40 }) => {
  // Creates a navigation hook
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'GoBack'>>();

  // Navigates back and sends parameters
  const goBack = () => {
    navigation.goBack();
  };

  const goBackStyles = StyleSheet.create({
    container: {
      paddingTop: '10%',
      marginRight: '30%',
    },
  });

  // Call this to display and icon image. No need to input anything to the component, will automatically
  // set the image size and navigation
  return (
    <TouchableOpacity onPress={goBack} testID={'GoBackIconTest'}>
      <Icon name='arrow-back' size={size} style={[{ color: 'white' }, goBackStyles.container]} />
    </TouchableOpacity>
  );
};

export default GoBackIcon;
