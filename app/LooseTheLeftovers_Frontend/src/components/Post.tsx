import React, { memo, useEffect, useRef, useState } from 'react';
import { type PostProps } from '../common/Types';
import { Card, Title } from 'react-native-paper';
import {
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
  View,
  ImageSourcePropType,
} from 'react-native';
import generateHomeScreenCardStyles from '../styles/postStyles';
import { global } from '../common/global_styles';
import {
  getCardColors,
  renderPostImage,
  render_Card_Back,
  render_Card_Middle,
  render_Icons,
  assignColor,
} from '../common/postUtils';
/**
 * Post Component
 *
 * This component represents a post card containing information about a post.
 *
 * @component
 *
 * @param {Object} props - The properties passed to the component.
 * @param {number} props.id - Post identifier.
 * @param {string} props.title - Title of the post.
 * @param {ImageSourcePropType} props.image - Image source for the post.
 * @param {string} props.expiryDate - Expiry date of the post.
 * @param {string} props.category - Category of the post.
 *
 * @returns {JSX.Element} The Post component.
 */
const Post: React.FC<PostProps> = ({
  id,
  endpoint,
  title,
  image,
  expiryDate,
  category,
  color,
  navigation,
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
   *
   * @function
   * @private
   * @param {string} category - The category of the post.
   * @returns {void}
   */
  const checkDietaryOption = (category: string) => {
    const dietaryOptions = category.split(',').map(option => option.trim());
    setShowNutAllergyIcon(dietaryOptions.includes('nut'));
    setShowGlutenFreeIcon(dietaryOptions.includes('gluten-free'));
    setShowVeganIcon(dietaryOptions.includes('vegan'));
  };

  /**
   * Handles the click event on the post card.
   *
   * @function
   * @private
   * @returns {void}
   */
  const handleCardClick = () => {
    navigation.navigate('View_Post', { postId: id, endpoint: endpoint });
  };

  /**
   * Handles the press in event for scaling animation.
   *
   * @function
   * @private
   * @returns {void}
   */
  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 1.1,
      useNativeDriver: true,
    }).start();
  };

  /**
   * Handles the press out event for scaling animation.
   *
   * @function
   * @private
   * @returns {void}
   */
  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  /**
   * Renders the front part of the post card.
   *
   * @function
   * @private
   * @returns {JSX.Element} The rendered front card component.
   */
  const render_Card_Front = (image: ImageSourcePropType) => {
    return (
      <Card style={cardStyles.card_front}>
        <Card.Content>
          <View style={cardStyles.front_container}>
            <Title style={cardStyles.card_title_style}>{title}</Title>
            <Title style={cardStyles.card_expiry_style}>{expiryDate}</Title>
            {render_Icons(
              cardStyles.card_dietaryIcons_wrapper_style,
              cardStyles.dietary_icon_style,
              showNutIcon,
              showVeganIcon,
              showGlutenFreeIcon,
            )}

            <View style={cardStyles.card_image_wrapper_style}>
              {renderPostImage(cardStyles.post_image_style, image, 100)}
            </View>
          </View>
        </Card.Content>
      </Card>
    );
  };

  const assignedColor = assignColor(color);
  const cardStyles = generateHomeScreenCardStyles(
    0.4 * screenWidth, //height
    0.8 * screenWidth, //width
    screenWidth,
    assignedColor,
    scaleValue,
  );
  return (
    <TouchableWithoutFeedback
      onPress={handleCardClick}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}>
      <View style={cardStyles.wrapper_style}>
        <Animated.View style={cardStyles.animation_style}>
          {render_Card_Back(cardStyles.card_back)}
          {render_Card_Middle(cardStyles.card_middle)}
          {render_Card_Front(image)}
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default memo(Post);
