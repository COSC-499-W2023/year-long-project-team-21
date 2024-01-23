import {
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  View,
  ViewStyle,
  useColorScheme,
} from 'react-native';
import Icon from '../components/Icon';
import React, { useState } from 'react';
import { Card, Title } from 'react-native-paper';

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
    showVeganIcon: boolean
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
        {renderHiddenIcon(
          showNutIcon,
          icons.dark[0],
          icon_style,
        )}
        {renderHiddenIcon(
          showGlutenFreeIcon,
          icons.dark[1],
          icon_style,
        )}
        {renderHiddenIcon(
          showVeganIcon,
          icons.dark[2],
          icon_style,
        )}
      </View>
    );
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

  if (useColorScheme() !== 'dark') {
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
export const renderPostImage = (imageStyle: StyleProp<ImageStyle>, size?: number, source?:ImageSourcePropType) => {
  return (
    <Icon source={require('../assets/banana.png')} imageStyle={imageStyle} size={size} />
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
