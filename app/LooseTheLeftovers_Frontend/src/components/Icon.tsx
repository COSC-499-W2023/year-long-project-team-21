import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { type IconProps } from '../common/Types';

/**
 * Icon component.
 *
 * A clickable icon component that can be used in various parts of the application.
 *
 * @component
 * @param {IconProps} props - The props for the Icon component.
 * @param {ImageSourcePropType} props.source - The image source for the icon.
 * @param {number} [props.size=24] - The size of the icon.
 * @param {() => void} props.onPress - Callback function to execute when the icon is pressed.
 * @param {string} [props.testID] - Optional test identifier for the component.
 * @param {StyleProp<ViewStyle>} [props.containerStyle] - Optional custom style for the TouchableOpacity container.
 * @param {StyleProp<ImageStyle>} [props.imageStyle] - Optional custom style for the Image element.
 * @example
 * <Icon
 *   source={require('../path/to/image.png')}
 *   size={30}
 *   onPress={() => console.log('Icon Pressed')}
 *   testID="icon-test"
 * />
 */
const Icon: React.FC<IconProps> = ({
  source,
  size = 24,
  onPress,
  testID,
  containerStyle,
  imageStyle,
}) => {
  return (
    <TouchableOpacity onPress={onPress} testID={testID} style={containerStyle}>
      <Image
        source={source}
        style={[{ width: size, height: size }, imageStyle]}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

export default Icon;
