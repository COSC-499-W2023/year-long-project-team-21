import { NavigationProp, RouteProp } from '@react-navigation/native';
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
 * @property {string} [testID] - Optional. An identifier used for testing purposes.
 */

interface ButtonProps {
  onPress: () => void;
  title: string;
  textColor?: string;
  borderColor?: string;
  buttonSize?: number;
  textSize?: number;
  testID?: string;
  borderRadius?: number;
  color?: string;
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
 * @property {boolean} multiline - Optional prop to make InputField multiline, capped at 10.
 */

interface InputFieldProps {
  placeholder: string;
  onChangeText: (input: string) => void;
  value: string | number;
  secureTextEntry?: boolean;
  placeholderTextColor?: string;
  multiline?: boolean;
  width?: string | number;
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
 * @property {string} [testID] - Optional. An identifier used for testing purposes.
 */

interface TextsProps {
  texts: string;
  textsSize?: number;
  textsColor?: string;
  textsWeight?:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900';
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
 * @property {string} [testID] - Optional. An identifier used for testing purposes.
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

/**
 * UpperBarProps (Header) interface for the UpperBar component.
 *
 * @interface
 * @property {() => void} onLeftPress - Callback function to execute when the left icon is pressed.
 * @property {() => void} onRightPress - Callback function to execute when the right icon is pressed.
 * @property {ImageSourcePropType} leftIconSource - The image source for the left icon.
 * @property {ImageSourcePropType} rightIconSource - The image source for the right icon.
 * @property {string} title - The prop to pass title.
 */

interface UpperBarProps {
  onLeftPress?: () => void;
  onRightPress?: () => void;
  leftIconSource?: ImageSourcePropType;
  rightIconSource?: ImageSourcePropType;
  title?: string;
}

/**
 * AdDataProps interface for the CreateAd screen.
 *
 * @interface
 * @property {string} title - The title of the ad.
 * @property {string} description - The description of the ad.
 * @property {string} category - The category of the ad, will be added as a field later.
 * @property {number} expiry - The number of days until the ad expires.
 * @property {string} imageUri - The URI of the image associated with the ad, optional.
 */

interface AdDataProps {
  title: string;
  description: string;
  category: string;
  expiry: number;
  imageUri?: string;
}

/**
 * ImagePickerButtonProps interface for ImagePicker component.
 *
 * @interface
 * @property {function} onImagePicked - A callback function that gets triggered when an image is selected.
 *                                      Receives the URI of the picked image as a string, or null if no image is selected.
 */

interface ImagePickerButtonProps {
  onImagePicked: (imageUri: string | null) => void;
  testID?: string;
}

/**
 * ExpirySliderProps interface for ExpirySlider component.
 *
 * @interface
 * @property {function} onExpiryChange - A callback function that gets triggered when the slider value changes.
 *                                       Receives the new expiry value as a number representing the number of days until expiry.
 */

interface ExpirySliderProps {
  onExpiryChange: (expiry: number) => void;
  testID?: string;
}

/**
 * PostProps interface for Post component.
 *
 * @interface
 * @property {id} - id for the ad
 * @property {title} - title for the ad
 * @property {image} - image for the ad
 * @property {expiryDate} - expiry date for the ad
 * @property {category} - category for the ad
 */

interface PostProps {
  id: number;
  endpoint: string;
  title?: string;
  image?: string; // Assuming image is a string representing the path or URL
  expiryDate?: string;
  category: string;
  navigation?: any;
  color: string;
}

/**
 * Defines the parameter structure for the 'View_Post' screen.
 *
 * @typedef {Object} PostStackParamList
 * @property {Object} View_Post - Parameters for the 'View_Post' screen.
 * @property {number} View_Post.postId - The post identifier.
 */
type PostStackParamList = {
  View_Post: { postId: number };
};

/**
 * Type representing the route props for the 'View_Post' screen.
 *
 * @typedef {RouteProp<PostStackParamList, 'View_Post'>} ViewPostScreenRouteProp
 */
type ViewPostScreenRouteProp = RouteProp<PostStackParamList, 'View_Post'>;

/**
 * Type representing the navigation props for the 'View_Post' screen.
 *
 * @typedef {NavigationProp<PostStackParamList, 'View_Post'>} ViewPostScreenNavigationProp
 */
type ViewPostScreenNavigationProp = NavigationProp<
  PostStackParamList,
  'View_Post'
>;

/**
 * Props type for the 'View_Post' screen.
 *
 * @typedef {Object} ViewPostProps
 * @property {ViewPostScreenRouteProp} route - Route props for navigation.
 * @property {ViewPostScreenNavigationProp} navigation - Navigation props for navigation.
 */
interface ViewPostProps {
  route: ViewPostScreenRouteProp;
  // navigation: ViewPostScreenNavigationProp;
  navigation: any;
}
/**
 * PostListRendererProps interface for PostListRenderer component.
 *
 * @interface
 * @property {isHeaderInNeed} - boolean asking if the Post List needs header for ranger dropdown
 */
interface PostListRendererProps {
  isHeaderInNeed: boolean;
  endpoint: string;
  location?: [];
  locationPermission?: boolean | null;
  navigation?: any;
}

/**
 * PostProps interface for Post component.
 *
 * @interface
 * @property {function} selectedRange - get range selected and send it back to the home
 */

interface SelectRangeBarProps {
  onSelectRange: (selectedRange: string) => void;
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
  type UpperBarProps,
  type AdDataProps,
  type ImagePickerButtonProps,
  type ExpirySliderProps,
  type PostProps,
  type PostListRendererProps,
  type SelectRangeBarProps,
  type ViewPostProps,
  type UserInfoProps,
};
