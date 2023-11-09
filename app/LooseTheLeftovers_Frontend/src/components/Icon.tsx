import React from 'react';
import { TouchableOpacity, Image, ImageSourcePropType } from 'react-native';

/**
 * IconProps interface for the Icon component.
 *
 * @interface
 * @property {ImageSourcePropType} source - The image source for the icon. Can be a local asset or a remote URL.
 * @property {number} [size=24] - Size of the icon, defaults to 24.
 * @property {() => void} onPress - Callback function executed when the icon is pressed.
 * @property {string} [testID] - Identifier for the component in test environments.
 */
interface IconProps {
  source: ImageSourcePropType;
  size?: number;
  onPress: () => void;
  testID?: string;
}

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
 * @example
 * <Icon
 *   source={require('../path/to/image.png')}
 *   size={30}
 *   onPress={() => console.log('Icon Pressed')}
 *   testID="icon-test"
 * />
 */
const Icon: React.FC<IconProps> = ({ source, size = 24, onPress, testID }) => {
  return (
    <TouchableOpacity onPress={onPress} testID={testID}>
      <Image
        source={source}
        style={[{ width: size, height: size }]}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

export default Icon;
