import {
  ImageSourcePropType,
  ImageStyle,
  Image,
  StyleProp,
  View,
  ViewStyle,
  useColorScheme,
} from 'react-native';
import Icon from '../components/Icon';
import React, { useState } from 'react';
import { Card, Title } from 'react-native-paper';
import { global } from '../common/global_styles';

/**
 * Renders a hidden icon based on visibility and source.
 *
 * @function
 * @private
 * @param {boolean} isVisible - Flag indicating whether the icon should be visible.
 * @param {ImageSourcePropType} source - Source for the icon image.
 * @returns {JSX.Element | null} The rendered icon or null if not visible.
 */
export const renderHiddenIcon = (
  isVisible: boolean,
  source: ImageSourcePropType,
  imageStyle?: StyleProp<ImageStyle>,
): JSX.Element | null => {
  return isVisible ? (
    <Icon source={source} imageStyle={imageStyle} testID="hiddenIcons" />
  ) : null;
};

/**
 * Renders dietary icons based on the color mode.
 *
 * @function
 * @private
 * @returns {JSX.Element} The rendered dietary icons.
 */
export const render_Icons = (
  dietary_wrapper_style: StyleProp<ViewStyle>,
  icon_style: StyleProp<ImageStyle>,
  showNutIcon: boolean,
  showGlutenFreeIcon: boolean,
  showVeganIcon: boolean,
) => {
  const icons = {
    dark: [
      require('../assets/nut_dark.png'),
      require('../assets/gluten-free_dark.png'),
      require('../assets/vegan_dark.png'),
    ],
    light: [
      require('../assets/nut.png'),
      require('../assets/gluten-free.png'),
      require('../assets/vegan.png'),
    ],
  };

  return (
    <View style={dietary_wrapper_style}>
      {renderHiddenIcon(showNutIcon, icons.light[0], icon_style)}
      {renderHiddenIcon(showGlutenFreeIcon, icons.light[1], icon_style)}
      {renderHiddenIcon(showVeganIcon, icons.light[2], icon_style)}
    </View>
  );
};

/**
 * Retrieves color settings for a card based on the specified expiry term.
 * Each term corresponds to a different color, indicating the proximity of the expiry date.
 *
 * @param {string} [color] - The expiry term coming from the backend ('expiry_short', 'expiry_mid', 'expiry_long').
 * @returns {Object} An object containing the color configuration for the card.
 * @todo Review documentation and consider adding color configuration for two-week expiry.
 */
export const assignColor = color => {
  const colorMapping = {
    expiry_short: global.post_color.expiry_short,
    expiry_mid: global.post_color.expiry_mid,
    expiry_long: global.post_color.expiry_long,
  };
  return color ? getCardColors(colorMapping[color]) : undefined;
};

/**
 * Calculates different shades of a color for the post card.
 *
 * @function
 * @private
 * @param {string} color - The base color.
 * @returns {Object} Object containing lightColor, originalColor, and middleColor.
 */
export const getCardColors = (color: string[]) => {
  let swapBuffer = '';
  // Original Color
  let originalColor = color[0];
  // Darker Shade
  const middleColor = color[1];
  // Lighter Shade
  let lightColor = color[2];

  if (useColorScheme() === 'dark') {
    swapBuffer = originalColor;
    originalColor = lightColor;
    lightColor = swapBuffer;
  }

  return { lightColor, originalColor, middleColor };
};

/**
 * Renders the main image for the post.
 *
 * @function
 * @private
 * @returns {JSX.Element} The rendered image component.
 */
export const renderPostImage = (
  imageStyle: StyleProp<ImageStyle>,
  source: ImageSourcePropType,
  size?: number,
) => {
  const imageSize = size ? { width: size, height: size } : {};
  console.log(source);
  // @TODO fix the type-error for source
  return (
    <Image
      source={{ uri: source }}
      style={[imageStyle, imageSize]}
      resizeMode="contain" // You can adjust the resizeMode if needed
    />
  );
};

/**
 * Renders the back part of the post card.
 *
 * @function
 * @private
 * @returns {JSX.Element} The rendered back card component.
 */
export const render_Card_Back = (style: StyleProp<ViewStyle>) => {
  return (
    <Card style={style}>
      <Card.Content>
        <Title children={undefined} />
      </Card.Content>
    </Card>
  );
};

/**
 * Renders the middle part of the post card.
 *
 * @function
 * @private
 * @returns {JSX.Element} The rendered middle card component.
 */
export const render_Card_Middle = (style: StyleProp<ViewStyle>) => {
  return (
    <Card style={style}>
      <Card.Content>
        <Title children={undefined} />
      </Card.Content>
    </Card>
  );
};
