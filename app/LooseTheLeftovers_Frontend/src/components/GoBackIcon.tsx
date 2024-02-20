import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { type AllIconProps } from '../common/Types';

/**
 * Icon component.
 *
 * A clickable goback component that be used in various parts of the application including tab.
 * Will take you to the create ad screen
 *
 * @component
 * @param {IconProps} props - The props for the Icon component.
 *
 * @param {ImageSourcePropType} props.source - The image source for the icon.
 * @param {number} [props.size=45] - The size of the icon.
 * @param {() => void} props.onPress - Callback function to execute when the icon is pressed.
 * @param {string} [props.testID] - Optional test identifier for the component.
 * @example
 */

//creates the parameters we're sending
type RootStackParamList = {
  GoBack: { name: string };
};

//uses all icon prop for the interface
const GoBackIcon: React.FC<AllIconProps> = ({ size = 30 }) => {
  //creates a navigation hook
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'GoBack'>>();

  //link to image
  const image = '../assets/back_arrow_white.png';

  //navigates to instruction and sends parameters
  const goBack = () => {
    navigation.goBack();
  };

  const goBackStyles = StyleSheet.create({
    container: {
      paddingTop: '45%',
      marginRight: '30%',
    },
  });
  // call this to display and icon image. No need to input anything to the component, will automatically
  // set the image size and navigation. This is Good for reusability.
  return (
    <TouchableOpacity onPress={goBack} testID={'GoBackIconTest'}>
      <Image
        source={require(image)}
        style={[{ width: size, height: size }, goBackStyles.container]}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

export default GoBackIcon;
