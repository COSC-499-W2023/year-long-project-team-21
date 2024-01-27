import { ReactNode } from 'react';
import {
  ImageSourcePropType,
  StyleProp,
  ViewStyle,
  ImageStyle,
} from 'react-native';

//type.tsx is a file that holds interfaces for all components

/**
 * ButtonProps interface for the Button component.
 *
 * @interface
 * @property {() => void} onPress - Callback function executed when the button is pressed.
 * @property {string} title - Text displayed on the button.
 * @property {string} textColor - Choose text color.
 * @property {number} buttonSize - Choose button size (width).
 * @property {number} textSize - Choose text size.
 */

interface ButtonProps {
  onPress: () => void;
  title: string;
  textColor?: string;
  borderColor?: string;
  buttonSize?: number;
  textSize?: number;
  testID?: string;
}

/**
 * HeaderProps interface for the Header component.
 *
 * @interface
 * @property {string} image - URL of the image to be displayed in the header.
 */

interface HeaderProps {
  image: string;
}

/**
 * IconProps interface for the Icon component.
 *
 * @interface
 * @property {ImageSourcePropType} source - The image source for the icon. Can be a local asset or a remote URL.
 * @property {number} [size=24] - Size of the icon, defaults to 24.
 * @property {() => void} onPress - Callback function executed when the icon is pressed.
 * @property {string} [testID] - Identifier for the component in test environments.
 * @property {StyleProp<ViewStyle>} [containerStyle] - Optional style for the TouchableOpacity container.
 * @property {StyleProp<ImageStyle>} [imageStyle] - Optional style for the Image element.
 */

interface IconProps {
  source: ImageSourcePropType;
  size?: number;
  onPress?: () => void;
  testID?: string;
  containerStyle?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
}

/**
 * InputFieldProps interface for the InputField component.
 *
 * @interface
 * @property {string} placeholderTextColor - The placeholder text to display in the input field.
 * @property {string} placeholder - The placeholder text to display in the input field.
 * @property {(input: string) => void} onChangeText - Callback function to notify parent components when the text changes.
 * @property {string | number} value - The initial value of the input field.
 * @property {boolean} [secureTextEntry=false] - If true, the text input obscures the text entered so that sensitive text like passwords is secure.
 */

interface InputFieldProps {
  placeholder: string;
  onChangeText: (input: string) => void;
  value: string | number;
  secureTextEntry?: boolean;
  placeholderTextColor?: string;
}

/**
 * Logo Props interface for the Logo component.
 *
 * @interface
 * @param {number} props.LogoSize - Change the size of the Logo.
 */
interface LogoProps {
  LogoSize?: number;
}
/**
 * TextProps interface for the Text component.
 *
 * @interface
 * @property {string} texts - Displays the Text.
 * @property {number} textxSize - Changes the Text size.
 * @property {() => void} onPress - Callback function executed when the button is pressed.
 */

interface TextsProps {
  texts: string;
  textsSize?: number;
  textsColor?: string;
  position?: string;
  onPress?: () => void;
  testID?: string;
}

/**
 * TitleProps interface for the Title component.
 *
 * @interface
 * @property {string} title - Text to be displayed as the title.
 * @property {number} titleSize - Text size for the title.
 * @property {string} titleColor - Text color for the title
 * @property {string} position - Text position for the title
 */
interface TitleProps {
  title: string;
  titleSize?: number;
  titleColor?: string;
  position?: string;
  testID?: string;
}

/**
 * AllIconProps interface for the all the Icon components.
 *
 * @interface
 * @property {ImageSourcePropType} source - The image source for the Icon. Is local.
 * @property {number} [size=45] - Size of the Icon.
 * @property {() => void} onPress - Callback function executed when the Icon is pressed.
 * @property {string} [testID] - Identifier for the component in test environments. It will change depending on the specific Icon.
 */

interface AllIconProps {
  source?: ImageSourcePropType;
  size?: number;
  onPress?: void;
  testID?: string;
}
/**
 * TabBar interface for the TabBar.
 *
 * @interface
 * @property {ImageSourcePropType} source - The image source for the Icon. Is local.
 * @property {ReactNode} props.LeftIcon - The input for the left component. Will take any type.
 * @property {ReactNode} props.LeftIcon - The input for the middle component. Will take any type.
 * @property {ReactNode} props.LeftIcon - The input for the right component. Will take any type.
 */

interface TabBarProps {
  LeftIcon?: ReactNode;
  MiddleIcon?: ReactNode;
  RightIcon?: ReactNode;
}

/**
 * TextImage interface for the TextImage component.
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
// interface UserInfoProps {
//  userInfoKeys: (keyof UserInfoData)[];
// }

// interface UserInfoData {
//   username: string;
//   email: string;
// }

interface UserInfoProps {
  userInfo: { [key: string]: string }; // Assuming user information is a key-value pair of strings
  userInfoKeys: string[];
}

export {
  type ButtonProps,
  type HeaderProps,
  type IconProps,
  type InputFieldProps,
  type LogoProps,
  type TextsProps,
  type TitleProps,
  type AllIconProps,
  type TabBarProps,
  type ImageTextProps,
  type UserInfoProps,
};
