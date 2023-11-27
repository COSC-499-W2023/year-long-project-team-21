import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleProp,
  ViewStyle,
  ImageStyle,
  View,
  Text,
} from 'react-native';
import style from '../styles/instructionStyles';

/**
 * Text image interface for the TextImage component.
 *
 * @interface
 * @property {ImageSourcePropType} source - The image for instruction.
 * @property {number} [size=24] - Size of the image, defaults to 24.
 * @property {string} [testID] - Identifier for the component in test environments.
 * @property {StyleProp<ViewStyle>} [containerStyle] - Optional style for the TouchableOpacity container.
 * @property {StyleProp<ImageStyle>} [imageStyle] - Optional style for the Image element.
 * @property {number} textSize - Changes the text size.
 * @property {string} text - Displays the Text.
 */
interface ImageTextProps {
  source: ImageSourcePropType;
  size?: number;
  testID?: string;
  containerStyle?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  text: string;
  textSize?: number;
}

/**
 * Textimage component.
 *
 * The instruction component that is used for the instruction screen.
 *
 * @component
 * @param {ImageTextProps} props - The props for the TextImage component.
 * @param {ImageSourcePropType} props.source - The image source for the TextImage.
 * @param {number} [props.size=24] - The size of the image.
 * @param {string} [props.testID] - Optional test identifier for the component.
 * @param {StyleProp<ViewStyle>} [props.containerStyle] - Optional custom style for the TouchableOpacity container.
 * @param {StyleProp<ImageStyle>} [props.imageStyle] - Optional custom style for the Image element.
 * @param {string} props.text - Text to be displayed as the Text.
 * @param {number} props.textSize - Text size.
 * @example
 *
 */
const ImageText: React.FC<ImageTextProps> = ({
  source,
  size = 24,
  testID = 'TextImage-image',
  imageStyle,
  text,
}) => {
  return (
    <View style={style.textimage}>
      <View style={style.text}>
        <Text>{text}</Text>
      </View>
      <View style={style.image}>
        <Image
          source={source}
          style={[{ width: size, height: size }, imageStyle]}
          resizeMode="contain"
          testID={testID}
        />
      </View>
    </View>
  );
};

export default ImageText;
