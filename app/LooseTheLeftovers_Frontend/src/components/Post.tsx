import React, { useEffect, useRef, useState } from 'react';
import { type PostProps } from '../common/Types';
import { Card, Title } from 'react-native-paper';
import Icon from '../components/Icon';
import {
  Animated,
  Dimensions,
  ImageSourcePropType,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import tinycolor from 'tinycolor2';
import generateHomeScreenCardStyles from '../styles/postStyles';
import { global } from '../common/global_styles';


/**
 * Post Component
 *
 * This component represents a post card containing information about a post.
 *
 * Components and Modules Used:
 * - React, useEffect, useRef, useState: Core React and React hooks for managing state and side effects.
 * - Dimensions, View, Animated, TouchableWithoutFeedback: React Native components for handling dimensions, views, animations, and touch events.
 * - Card, Title: Components from 'react-native-paper' for rendering cards and titles.
 * - Icon: Custom component for rendering icons.
 * - tinycolor: External library for color manipulation.
 * - generateHomeScreenCardStyles: Function for generating styles based on the device screen width and colors.
 * - global: Styles and configurations shared across the application.
 *
 * Props:
 * - id: Post identifier.
 * - title: Title of the post.
 * - image: Image source for the post.
 * - expiryDate: Expiry date of the post.
 * - category: Category of the post.
 *
 * State:
 * - scaleValue: Animated value for scaling animation.
 * - lightMode: Color mode (light/dark).
 * - showNutAllergyIcon, showGlutenFreeIcon, showVeganIcon: Boolean flags to show dietary icons.
 *
 * Methods:
 * - checkDietaryOption: Checks and sets dietary options based on the post category.
 * - checkExpiryDate: Placeholder for future implementation to check the expiry date.
 * - getCardColors: Calculates different shades of a color for the post card.
 * - handleCardClick: Handles the click event on the post card.
 * - handlePressIn: Handles the press in event for scaling animation.
 * - handlePressOut: Handles the press out event for scaling animation.
 * - renderHiddenIcon: Renders a hidden icon based on visibility and source.
 * - renderPostImage: Renders the main image for the post.
 * - render_Card_Back, render_Card_Middle, render_Card_Front: Renders different parts of the post card.
 *
 * @param {PostProps} props - The properties passed to the component.
 * @returns {JSX.Element} The Post component.
 */
const Post: React.FC<PostProps> = ({
  id,
  title,
  image,
  expiryDate,
  category,
  
}: PostProps): JSX.Element => {
  const screenWidth = Dimensions.get('window').width;
  const scaleValue = useRef(new Animated.Value(1)).current;
  const [lightMode, setLightMode] = useState('');
  const [showNutIcon, setShowNutAllergyIcon] = useState(false);
  const [showGlutenFreeIcon, setShowGlutenFreeIcon] = useState(false);
  const [showVeganIcon, setShowVeganIcon] = useState(false);

  // Move checkDietaryOption to useEffect to avoid re-renders
  useEffect(() => {
    checkDietaryOption(category);
  }, [category]);

  /**
   * Checks and sets dietary options based on the post category.
   * @param {string} category - The category of the post.
   */
  const checkDietaryOption = (category: string) => {
    const dietaryOptions = category.split(',').map(option => option.trim());
    setShowNutAllergyIcon(dietaryOptions.includes('nut'));
    setShowGlutenFreeIcon(dietaryOptions.includes('gluten-free'));
    setShowVeganIcon(dietaryOptions.includes('vegan'))
  };

  const checkExpiryDate = () => {};

  /**
   * Calculates different shades of a color for the post card.
   * @param {string} color - The base color.
   * @returns {Object} Object containing lightColor, originalColor, and middleColor.
   */
  const getCardColors = (color: string) => {
    const mainColor = tinycolor(color);

    // Original Color
    const originalColor = mainColor.toString();

    // Darker Shade
    const middleColor = mainColor.lighten(20).toString();

    // Lighter Shade
    const lightColor = mainColor.lighten(20).toString();

    return { lightColor, originalColor, middleColor };
  };

  /**
   * Handles the click event on the post card.
   */
  const handleCardClick = () => {
    console.log('tapped:', id);
   // navigation.navigate('View_Post', { postId: id })
  };

  /**
   * Handles the press in event for scaling animation.
   */
  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 1.1,
      useNativeDriver: true,
    }).start();
  };

  /**
   * Handles the press out event for scaling animation.
   */
  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  /**
   * Renders a hidden icon based on visibility and source.
   * @param {boolean} isVisible - Flag indicating whether the icon should be visible.
   * @param {ImageSourcePropType} source - Source for the icon image.
   * @returns {JSX.Element | null} The rendered icon or null if not visible.
   */
  const renderHiddenIcon = (
    isVisible: boolean,
    source: ImageSourcePropType,
  ) => {
    return isVisible ? (
      <Icon source={source} imageStyle={cardStyles.dietary_icon_style} testID='hiddenIcons'/>
    ) : null;
  };

  /**
   * Renders the main image for the post.
   * @returns {JSX.Element} The rendered image component.
   */
  const renderPostImage = () => {
    return (
      <Icon
        source={require('../assets/banana.png')}
        imageStyle={cardStyles.post_image_style}
      />
    );
  };

  /**
   * Renders the back part of the post card.
   * @returns {JSX.Element} The rendered back card component.
   */
  const render_Card_Back = () => {
    return (
      <Card style={cardStyles.card_back}>
        <Card.Content>
          <Title children={undefined} />
        </Card.Content>
      </Card>
    );
  };

  /**
   * Renders the middle part of the post card.
   * @returns {JSX.Element} The rendered middle card component.
   */
  const render_Card_Middle = () => {
    return (
      <Card style={cardStyles.card_middle}>
        <Card.Content>
          <Title children={undefined} />
        </Card.Content>
      </Card>
    );
  };

   /**
   * Renders the front part of the post card.
   * @returns {JSX.Element} The rendered front card component.
   */
  const render_Card_Front = () => {
    return (
      <Card style={cardStyles.card_front}>
        <Card.Content>
          <View style={cardStyles.front_container}>
            <Title style={cardStyles.card_title_style}>{title}</Title>
            <Title style={cardStyles.card_expiry_style}>{expiryDate}</Title>
            <View style={cardStyles.card_dietaryIcons_wrapper_style}>
              {renderHiddenIcon(showNutIcon, require('../assets/nut.png'))}
              {renderHiddenIcon(showGlutenFreeIcon,require('../assets/gluten-free.png'))}
              {renderHiddenIcon(showVeganIcon, require('../assets/vegan.png'))}
            </View>
            <View style={cardStyles.card_image_wrapper_style}>{renderPostImage()}</View>
          </View>
        </Card.Content>
      </Card>
    );
  };

  const colors = getCardColors(global.post_color.expiry_long);
  const cardStyles = generateHomeScreenCardStyles(
    0.5 * screenWidth, //height
    0.8 * screenWidth, //width
    screenWidth,
    colors,
    scaleValue,
  );
  return (
    <TouchableWithoutFeedback
      onPress={handleCardClick}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}>
      <View style={cardStyles.wrapper_style}>
        <Animated.View style={cardStyles.animation_style}>
          {render_Card_Back()}
          {render_Card_Middle()}
          {render_Card_Front()}
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Post;


