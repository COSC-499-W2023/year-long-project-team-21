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
import { useColorScheme } from 'react-native';

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
   * Calculates different shades of a color for the post card.
   *
   * @function
   * @private
   * @param {string} color - The base color.
   * @returns {Object} Object containing lightColor, originalColor, and middleColor.
   */
  const getCardColors = (color: string[]) => {
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
   * Handles the click event on the post card.
   *
   * @function
   * @private
   * @returns {void}
   */
  const handleCardClick = () => {
    console.log('tapped:', id);
    // navigation.navigate('View_Post', { postId: id })
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
   * Renders a hidden icon based on visibility and source.
   *
   * @function
   * @private
   * @param {boolean} isVisible - Flag indicating whether the icon should be visible.
   * @param {ImageSourcePropType} source - Source for the icon image.
   * @returns {JSX.Element | null} The rendered icon or null if not visible.
   */
  const renderHiddenIcon = (
    isVisible: boolean,
    source: ImageSourcePropType,
  ) => {
    return isVisible ? (
      <Icon
        source={source}
        imageStyle={cardStyles.dietary_icon_style}
        testID="hiddenIcons"
      />
    ) : null;
  };

  /**
   * Renders the main image for the post.
   *
   * @function
   * @private
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
   *
   * @function
   * @private
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
   *
   * @function
   * @private
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
   *
   * @function
   * @private
   * @returns {JSX.Element} The rendered front card component.
   */
  const render_Card_Front = () => {
    return (
      <Card style={cardStyles.card_front}>
        <Card.Content>
          <View style={cardStyles.front_container}>
            <Title style={cardStyles.card_title_style}>{title}</Title>
            <Title style={cardStyles.card_expiry_style}>{expiryDate}</Title>
            {render_Icons()}
            <View style={cardStyles.card_image_wrapper_style}>
              {renderPostImage()}
            </View>
          </View>
        </Card.Content>
      </Card>
    );
  };

  /**
   * Renders dietary icons based on the color mode.
   *
   * @function
   * @private
   * @returns {JSX.Element} The rendered dietary icons.
   */
  const render_Icons = () => {
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
      <View style={cardStyles.card_dietaryIcons_wrapper_style}>
        {renderHiddenIcon(showNutIcon, icons.dark[0])}
        {renderHiddenIcon(showGlutenFreeIcon, icons.dark[1])}
        {renderHiddenIcon(showVeganIcon, icons.dark[2])}
      </View>
    );
  };

  /**
   * Assigns a random color scheme for the post card.
   *
   * @function
   * @private
   * @returns {Object} Object containing lightColor, originalColor, and middleColor.
   */
  const assignRandomColor = () => {
    const colors = [
      global.post_color.expiry_mid,
      global.post_color.expiry_long,
      global.post_color.expiry_short,
    ];
    const randomInd = Math.floor(Math.random() * 3);
    return getCardColors(colors[randomInd]);
  };

  const colors = assignRandomColor();
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
