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
      borderRadius: 0.1 * screenWidth, //animation with tap will repspond only on the card
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
      elevation:5,
    },
    card_middle: {
      height: card_height,
      width: card_width,
      borderRadius: 0.1 * screenWidth,
      backgroundColor: colors.middleColor,
      zIndex: -2,
      marginLeft: -0.75 * screenWidth, // Slightly overlapping the previous card
      elevation:5,
    },
    card_front: {
      height: card_height,
      width: card_width,
      borderRadius: 0.1 * screenWidth,
      backgroundColor: colors.originalColor,
      zIndex: -1,
      flexDirection: 'column',
      marginLeft: -0.75 * screenWidth, // No overlap for the front card
      justifyContent: 'center', // Center content vertically
      elevation:5,
    },
    front_container: {
      justifyContent: 'space-evenly', // Center content vertically
      flexDirection:'column',
      height: card_height*0.9,
    },
    card_title_style: {
      color: 'black', // could be black in light mode
      fontSize: 0.07 * screenWidth,
    },
    card_expiry_style: {
      color: colors.middleColor, // could be black in light mode
      fontSize: 0.06 * screenWidth,
      opacity: 1,
    },
    card_dietaryIcons_wrapper_style: {
      flexDirection: 'row',
      width: card_width*0.45,
      justifyContent:'flex-start'
    },
    card_image_wrapper_style: {
      position: 'absolute',
      right: card_width*0.05,
      top: card_height*0.3,
    },
    dietary_icon_style: {
      height: card_height*0.2,
      paddingLeft: card_width*0.15
    },
    post_image_style: {
      width: card_width*0.35, 
      height: card_height*0.5 
    }

  });

export default generateHomeScreenCardStyles;
