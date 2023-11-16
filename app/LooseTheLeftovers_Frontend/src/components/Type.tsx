import {
  ImageSourcePropType,
  StyleProp,
  ViewStyle,
  ImageStyle,
} from 'react-native';

interface ButtonProps {
  onPress: () => void;
  title: string;
  textColor?: string;
  borderColor?: string;
  buttonSize?: number;
  textSize?: number;
  testID?: string;
}

interface HeaderProps {
  image: string;
}

interface IconProps {
  source: ImageSourcePropType;
  size?: number;
  onPress?: () => void;
  testID?: string;
  containerStyle?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
}

interface InputFieldProps {
  placeholder: string;
  onChangeText: (input: string) => void;
  value: string | number;
  secureTextEntry?: boolean;
}

interface LogoProps {
  LogoSize?: number;
}

interface TextsProps {
  texts: string;
  textsSize?: number;
  textsColor?: string;
  position?: string;
  onPress?: () => void;
}
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
