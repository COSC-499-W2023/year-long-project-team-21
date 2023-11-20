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
 * @property {string} textColor - choose text color
 * @property {number} buttonSize - Choose button size (width)
 * @property {number} textSize - Choose text size
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
 * Logo Props interface for the logo component.
 *
 * @interface
 * @param {number} props.LogoSize - change the size of a logo
 */
interface LogoProps {
  LogoSize?: number;
}
/**
 * TextProps interface for the Text component.
 *
 * @interface
 * @property {string} texts -  displays the Text.
 * @property {number} textxSize -changes the text size
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

export {
  type ButtonProps,
  type HeaderProps,
  type IconProps,
  type InputFieldProps,
  type LogoProps,
  type TextsProps,
  type TitleProps,
};
