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
const Post: React.FC<PostProps> = ({
  id,
  title,
  image,
  expiryDate,
  category,
}) => {
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

  const checkDietaryOption = (category: string) => {
    switch (category) {
      case 'nut':
        setShowNutAllergyIcon(true);
        break;
      case 'gluten-free':
        setShowGlutenFreeIcon(true);
        break;
      case 'vegan':
        setShowVeganIcon(true);
        break;
      default:
        setShowNutAllergyIcon(false);
        setShowGlutenFreeIcon(false);
        setShowVeganIcon(false);
    }
  };

  const checkExpiryDate = () => {};

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

  const handleCardClick = () => {
    console.log("tapped:",id);
  };

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 1.1,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const renderHiddenIcon = (
    isVisible: boolean,
    source: ImageSourcePropType,
  ) => {
    return isVisible ? (
      <Icon source={source} imageStyle={{ width: 40, height: 40 }} />
    ) : null;
  };

  const render_Card_Back = () => {
    return (
      <Card style={cardStyles.card_back}>
        <Card.Content>
          <Title children={undefined} />
        </Card.Content>
      </Card>
    );
  };

  const render_Card_Middle = () => {
    return (
      <Card style={cardStyles.card_middle}>
        <Card.Content>
          <Title children={undefined} />
        </Card.Content>
      </Card>
    );
  };

  const render_Card_Front = () => {
    return (
      <Card style={cardStyles.card_front}>
        <Card.Content>
          <View style={cardStyles.front_container}>
            <Title style={cardStyles.card_title_style}>{title}</Title>
            <Title style={cardStyles.card_expiry_style}>{expiryDate}</Title>
            <View style={cardStyles.card_dietaryIcons_style}>
              {renderHiddenIcon(showNutIcon, require('../assets/banana.png'))}
              {renderHiddenIcon(showGlutenFreeIcon,require('../assets/banana.png'))}
              {renderHiddenIcon(showVeganIcon, require('../assets/banana.png'))}
            </View>
            <View style={cardStyles.card_image_style}>
              <Icon
                source={require('../assets/banana.png')}
                imageStyle={{ width: 100, height: 100 }}
              />
            </View>
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
