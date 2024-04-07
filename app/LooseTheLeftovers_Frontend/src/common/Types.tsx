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
  onPress: () => any;
  title: string;
  textColor?: string;
  borderColor?: string;
  buttonSize?: number;
  textSize?: number;
  testID?: string;
  borderRadius?: number;
  color?: string;
  backgroundcolor?: string;
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
 * @property {boolean} maxLength - Optional character limit.
 * @property {string} [testID] - Optional. An identifier used for testing purposes.
 */

interface InputFieldProps {
  placeholder: string;
  onChangeText: (input: string) => void;
  value: string | number;
  secureTextEntry?: boolean;
  placeholderTextColor?: string;
  multiline?: boolean;
  width?: string | number;
  maxLength?: number;
  testID?: string;
}

/**
 * Logo Props interface for the Logo component.
 *
 * @interface
 * @property {() => void} onPress - Callback function executed when the button is pressed.
 * @param {number} props.LogoSize - Change the size of the Logo.
 */

interface LogoProps {
  onPress?: () => void;
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
  userInfo: { [key: string]: string };
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
 * @property {string} image - The URI of the image associated with the ad, optional.
 */
interface AdDataProps {
  category: string;
  description: string;
  expiry: number;
  title: string;
  image: string;
  color: string;
  longitude: number;
  latitude: number;
  ratings?: number;
  username?: string;
  count?: number;
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
  title: string;
  image: string; // Assuming image is a string representing the path or URL
  expiryDate?: string;
  category: string;
  navigation?: any;
  color: string;
  distance?: number;
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
  whichHeader?: React.ReactNode;
  endpoint: string;
  getData: (pagenumber: number) => any | null;
  location?: [];
  locationPermission?: boolean | null;
  navigation?: any;
  handleLoginOnpress?: () => any;
  handleEditOnpress?: () => any;
  userInfo?: { username: string; email: string };
  rating?: number;
  reviewsCount?: number;
}

interface SelectRangeBarProps {
  range?: number;
  setRange: any;
}

/**
 * Defines the structure for the global context state used throughout the app.
 * This includes the state for tracking the first launch status, the current
 * permission status for accessing location services, and functions to update
 * these states.
 *
 * @interface GlobalContextType
 * @property {boolean | null} firstLaunch - Indicates whether the app is being launched for the first time. `true` for the first launch, `false` otherwise, and `null` before determination.
 * @property {string | null} locationPermission - Represents the current status of location services permission as a string. It can be `null` if the permission status has not been determined yet.
 * @property {Function} updateFirstLaunch - A function to update the `firstLaunch` state. Accepts a `boolean` or `null` value.
 * @property {Function} updateLocationPermission - A function to update the `locationPermission` state. Accepts a string value representing the new permission status.
 */
interface GlobalContextType {
  firstLaunch: boolean | null;
  locationPermission: string | null;
  userId: any;
  updateFirstLaunch: (value: boolean) => void;
  updateLocationPermission: (value: string) => void;
  setUserId: (value: number) => void;
}

interface CategoryInfo {
  name: string;
  imageSource: ImageSourcePropType;
  size: number;
}

interface CategoryProps {
  size?: number;
  categoryName: string;
  imageSource: ImageSourcePropType;
  onPress: () => void;
  isSelected: boolean;
}

interface CategoryRenderProps {
  categoryInfo: CategoryInfo[];
  onCategoryPress: (categoryName: string, isSelected: boolean) => void;
  selectedCategories: string[];
}

/**
 * ChatType type definition for ChatList screen.
 *
 * The structure of a single chat item, detailing the
 * information needed to display and identify a chat.
 *
 * @typedef {Object} ChatType
 * @property {number} id - The unique id for the chat.
 * @property {number} user_id - The user ID of the other person in the conversation.
 * @property {number} ad_id - The ad ID related to the chat.
 * @property {string} name - The name of the other user in the chat.
 * @property {string} lastMessage - The most recent message sent in the chat.
 * @property {string} time_sent - The timestamp of the last message, formatted as a string.
 * @property {boolean} read - The flag whether the message was read or not.
 */
type ChatType = {
  id: string;
  user_id: number;
  ad_id: number;
  username: string;
  msg: string;
  time_sent: string;
  read: boolean;
};

/**
 * ChatListItemProps type definition for ChatListItem component.
 *
 * The props required by the ChatListItem component, including the chat
 * data to be displayed and the onPress callback function, triggered when
 * the chat item is pressed.
 *
 * @typedef {Object} ChatListItemProps
 * @property {ChatType} chat - The chat data to display in this list item.
 * @property {(chatId: number) => void} onPress - Callback function when the chat item is pressed, will navigate to Chat screen.
 */
type ChatListItemProps = {
  chat: ChatType;
  onPress: (chatId: number) => void;
};

interface RatingProps {
  testID?: string;
  backgroundColor?: string;
  startingValue?: number;
  imageSize?: number;
  showRating?: boolean;
  readonly?: boolean;
  onFinishRating?: (rating: number) => void;
};

/**
 * ChatContextType type definition for ChatContext.
 *
 * The structure and types of values for the ChatContext, which includes
 * the current user's ID, an array of chat messages, the logged-in status, and functions
 * to update the logged-in status and the focus state of the ChatList component.
 *
 * @typedef {Object} ChatContextType
 * @property {string | null} your_id - The current user's ID. `null` if the user is not logged in.
 * @property {ChatType[]} chats - An array of chat data, the last message in each chat.
 * @property {boolean} loggedIn - A boolean indicating whether the user is currently logged in.
 * @property {boolean} hasUnread - A boolean indicating whether the user has unread messages.
 * @property {(value: boolean) => void} updateLoggedIn - A function to update the `loggedIn` state. Accepts a boolean.
 * @property {(value: boolean) => void} updateFocus - A function to update the focus state of the ChatList component. Accepts a boolean indicating whether the ChatList is in focus.
 */
interface ChatContextType {
  your_id: string | null;
  chats: ChatType[];
  loggedIn: boolean;
  hasUnread: boolean;
  updateLoggedIn: (value: boolean) => void;
  updateFocus: (value: boolean) => void;
  markChatAsReadById: (value: string) => void;
};

type GetDataFunctionType = ((pageNumber: number) => Promise<any>) | null;

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
  type GlobalContextType,
  type CategoryRenderProps,
  type CategoryProps,
  type ChatType,
  type ChatListItemProps,
  type RatingProps,
  type ChatContextType,
  type GetDataFunctionType,
};
