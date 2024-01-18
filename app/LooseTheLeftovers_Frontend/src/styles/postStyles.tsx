import { Animated, StyleSheet } from 'react-native';

const generateHomeScreenCardStyles = (
  card_height: number,
  card_width: number,
  screenWidth: number,
  colors: { lightColor: string; middleColor: string; originalColor: string },
  scaleValue: Animated.Value,
) =>
  StyleSheet.create({
    wrapper_style: {
      alignSelf: 'center',
      flexDirection: 'row',
    },
    animation_style: {
      position: 'relative',
      flexDirection: 'row',
      transform: [{ scale: scaleValue }],
    },
    card_back: {
      height: card_height,
      width: card_width,
      borderRadius: 0.1 * screenWidth,
      backgroundColor: colors.lightColor,
      zIndex: -3,
      marginLeft: 0.01 * screenWidth, // margin from left side screen
    },
    card_middle: {
      height: card_height,
      width: card_width,
      borderRadius: 0.1 * screenWidth,
      backgroundColor: colors.middleColor,
      zIndex: -2,
      marginLeft: -0.75 * screenWidth, // Slightly overlapping the previous card
    },
    card_front: {
      height: card_height,
      width: card_width,
      borderRadius: 0.1 * screenWidth,
      backgroundColor: colors.originalColor,
      zIndex: -1,
      flexDirection: 'column',
      marginLeft: -0.75 * screenWidth, // No overlap for the front card
      justifyContent: 'space-evenly', // Center content vertically
    },
    card_title_style: {
      color: 'white', // could be black in light mode
      fontSize: 0.07 * screenWidth,
    },
    card_expiry_style: {
      color: colors.middleColor, // could be black in light mode
      fontSize: 0.06 * screenWidth,
      opacity: 1,
    },
    card_dietaryIcons_style: {
      flexDirection: 'row',
    },
  });

export default generateHomeScreenCardStyles;
