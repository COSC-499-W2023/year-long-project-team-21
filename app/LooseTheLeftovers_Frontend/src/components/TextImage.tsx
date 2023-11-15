// import React from 'react';
// import { View, Text, Image, ImageStyle, StyleProp } from 'react-native';
// /**
//  * TextProps interface for the Text component.
//  *
//  * @interface
//  * @property {string} text -  displays the Text.
//  * @property {number} textSize -changes the text size
//  * @property {string} image -changes the text size
//  * @property {StyleProp<ImageStyle>} [imageStyle] - Optional style for the Image element.

//  */
// interface TextImageProps {
//   text: string;
//   textSize?: number;
//   image: string;
//   imageSize: string;
//   imageStyle?: StyleProp<ImageStyle>;
// }

// /**
//  * Text component.
//  *
//  * * @component
//  *
//  * @param {TextImage} props - The props for the Text component.
//  * @param {string} props.text - Text to be displayed as the Text.
//  * @param {string} props.image - Text to be displayed as the Text
//  * @param {string} props.imageSize - Text to be displayed as the Text
//  *
//  * @param {StyleProp<ImageStyle>} [props.imageStyle] - Optional custom style for the Image element.

//  *
//  * @example
//  * <Texts texts="Words" />
//  */

// const TextImage: React.FC<TextImageProps> = ({
//   text,
//   image,
//   imageSize,
//   imageStyle,
// }) => {
//   return (
//     <View style={style.textimage}>
//       <View style={style.text}>
//         <Text>{text}</Text>
//       </View>
//       <View style={style.image}>
//         {/* <Image
//           source={require(image)}
//           style={{ width: imageSize, height: imageSize }}
//           resizeMode="contain"
//         /> */}

//         <Image
//           source={require(image)}
//           style={[{ width: imageSize, height: imageSize }, imageStyle]}
//           resizeMode="contain"
//         />
//       </View>
//     </View>
//   );
// };

// export default TextImage;

// import React from 'react';

// import style from '../styles/instructionStyles';
// import {
//   TouchableOpacity,
//   Image,
//   ImageSourcePropType,
//   StyleProp,
//   ViewStyle,
//   ImageStyle,
//   View,
//   Text,
// } from 'react-native';

// /**
//  * IconProps interface for the Icon component.
//  *
// //  * @interface
// //  * @property {string} image - The image source for the icon. Can be a local asset or a remote URL.
// //  * @property {number} [size=24] - Size of the icon, defaults to 24.
// //  * @property {number} textSize -changes the text size
// //  * @property {string} text -  displays the Text.
// //  */
// // interface IconProps {
//   image: string;
//   size?: number;
//   text: string;
//   textSize?: number;
// }

// /**
//  * Icon component.
//  *
//  * A clickable icon component that can be used in various parts of the application.
//  *
//  * @component
//  * @param {IconProps} props - The props for the Icon component.
//  *
//  * @param {string} props.image - The image source for the icon.
//  * @param {number} [props.size=24] - The size of the icon.
//  * @param {string} props.text - Text to be displayed as the Text.
//  * @param {number} props.textSize - Text size
//  * @example
//  * <Icon
//  *   source={require('../path/to/image.png')}
//  *   size={30}
//  *   onPress={() => console.log('Icon Pressed')}
//  *   testID="icon-test"
//  * />
//  */
// const Icon: React.FC<IconProps> = ({
//   image,
//   size = 60,

//   text,
// }) => {
//   return (
//     <View style={style.textimage}>
//       <View style={style.text}>
//         <Text>{text}</Text>
//       </View>
//       <View style={style.image}>
//         <Image source={require(image)} style={{ width: size, height: size }} />
//       </View>
//     </View>
//   );
// };

// export default Icon;
import style from '../styles/instructionStyles';
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

/**
 * IconProps interface for the Icon component.
 *
 * @interface
 * @property {ImageSourcePropType} source - The image source for the icon. Can be a local asset or a remote URL.
 * @property {number} [size=24] - Size of the icon, defaults to 24.
 * @property {string} [testID] - Identifier for the component in test environments.
 * @property {StyleProp<ViewStyle>} [containerStyle] - Optional style for the TouchableOpacity container.
 * @property {StyleProp<ImageStyle>} [imageStyle] - Optional style for the Image element.
 * @property {number} textSize -changes the text size
 * @property {string} text -  displays the Text.
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
 * Icon component.
 *
 * A clickable icon component that can be used in various parts of the application.
 *
 * @component
 * @param {ImageTextProps} props - The props for the Icon component.
 * @param {ImageSourcePropType} props.source - The image source for the icon.
 * @param {number} [props.size=24] - The size of the icon.
 * @param {() => void} props.onPress - Callback function to execute when the icon is pressed.
 * @param {string} [props.testID] - Optional test identifier for the component.
 * @param {StyleProp<ViewStyle>} [props.containerStyle] - Optional custom style for the TouchableOpacity container.
 * @param {StyleProp<ImageStyle>} [props.imageStyle] - Optional custom style for the Image element.
 * @param {string} props.text - Text to be displayed as the Text.
 * @param {number} props.textSize - Text size
 * @example
 * <Icon
 *   source={require('../path/to/image.png')}
 *   size={30}
 *   onPress={() => console.log('Icon Pressed')}
 *   testID="icon-test"
 * />
 */
const ImageText: React.FC<ImageTextProps> = ({
  source,
  size = 24,
  testID,
  containerStyle,
  imageStyle,
  text,
  textSize,
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
        />
      </View>
    </View>
  );
};

export default ImageText;
