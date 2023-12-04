import React from 'react';
import { Image, View, Text } from 'react-native';
import style from '../styles/instructionStyles';
import { type ImageTextProps } from '../common/Types';

/**
 * TextImage component.
 *
 * The instruction component that is used for the Instruction screen.
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
      <View style={style.textimage}>
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
