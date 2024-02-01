import { Animated, StyleSheet } from 'react-native';
import { global } from '../common/global_styles';
const generateHomeScreenCardStyles = (
  card_height: number,
  card_width: number,
  screenWidth: number,
  colors: { lightColor: string ; middleColor: string; originalColor: string } ,
  scaleValue: Animated.Value,
) =>
  StyleSheet.create({
    wrapper_style: {
      alignSelf: 'center',
      flexDirection: 'row',
    },
    animation_style: {
      borderRadius: 0.06 * screenWidth, //animation with tap will repspond only on the card
      position: 'relative',
      flexDirection: 'row',
      transform: [{ scale: scaleValue }],
    },
    card_back: {
      height: card_height,
      width: card_width,
      borderRadius: 0.06 * screenWidth,
      backgroundColor: colors.lightColor,
      zIndex: -3,
      marginLeft: 0.01 * screenWidth, // margin from left side screen
      elevation: 5,
    },
    card_middle: {
      height: card_height,
      width: card_width,
      borderRadius: 0.06 * screenWidth,
      backgroundColor: colors.middleColor,
      zIndex: -2,
      marginLeft: -0.75 * screenWidth, // Slightly overlapping the previous card
      elevation: 5,
    },
    card_front: {
      height: card_height,
      width: card_width,
      borderRadius: 0.06 * screenWidth,
      backgroundColor: colors.originalColor,
      zIndex: -1,
      flexDirection: 'column',
      marginLeft: -0.75 * screenWidth, // No overlap for the front card
      elevation: 5,
      position: 'relative',
    },
    front_container: {
      justifyContent: 'space-between', // Center content vertically
      flexDirection: 'column',
      height: card_height * 0.8,
      zIndex: -1,
    },
    card_title_style: {
      color: global.secondary, // could be black in light mode
      fontSize: 0.06 * screenWidth,
    },
    card_expiry_style: {
      color: colors.lightColor, // could be black in light mode
      fontSize: 0.05 * screenWidth,
    },
    card_dietaryIcons_wrapper_style: {
      flexDirection: 'row',
      width: card_width * 0.1,
      justifyContent: 'flex-start',
    },
    card_image_wrapper_style: {
      position: 'absolute',
      paddingTop: '-40%',
      backgroundColor: 'white',
      height: card_height * 0.6,
      zIndex: -2,
      right: 0,
      bottom: 0,
      borderRadius: screenWidth * 0.04,
      justifyContent: 'flex-end',
    },
    dietary_icon_style: {
      height: card_height * 0.15,
      width: card_height * 0.15,
      marginRight: 10,
    },
    post_image_style: {
      width: card_width * 0.4,
      height: card_height * 0.6,
    },
  });

export default generateHomeScreenCardStyles;
