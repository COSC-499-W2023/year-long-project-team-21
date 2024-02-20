import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TouchableOpacity, Image, View } from 'react-native';
import { type AllIconProps } from '../common/Types';

/**
 * Icon component.
 *
 * A clickable homeicon component that be used in various parts of the application including tab.
 * Will take you to the home sreen
 *
 * @component
 * @param {IconProps} props - The props for the Icon component.
 * @param {ImageSourcePropType} props.source - The image source for the icon.
 * @param {number} [props.size=45] - The size of the icon.
 * @param {string} [props.testID] - Optional test identifier for the component.
 * @example
 */

//uses all icon prop for the interface
const Logo: React.FC<AllIconProps> = ({ size = 63 }) => {
  //creates a navigation hook

  //link to image
  const image = '../assets/logo.png';

  //navigates to Home and sends parameters

  //call this to display and icon image. No need to input anything to the component, will automatically
  //set the image size and navigation. Yhis is Good for reusability.
  return (
    <View testID={'HomeIconTest'}>
      <Image
        source={require(image)}
        style={[{ width: size, height: size }]}
        resizeMode="contain"
      />
    </View>
  );
};

export default Logo;
