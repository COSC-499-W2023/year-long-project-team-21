import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  StyleProp,
  Text,
  View,
  ViewStyle,
  ActivityIndicator,
} from 'react-native';
import globalscreenstyles from '../common/global_ScreenStyles';
import { ViewPostProps } from '../common/Types';
import Logo from '../components/Logo';
import { Card, Title } from 'react-native-paper';
import {
  renderPostImage,
  render_Card_Back,
  render_Card_Middle,
  render_Icons,
  assignColor,
} from '../common/postUtils';
import { global } from '../common/global_styles';
import generateViewPostStyles from '../styles/view_postStyles';
import Button from '../components/Button';
import TabBarTop from '../components/TabBarTop';
import TabBarBottom from '../components/TabBarBottom';
import CreateAdIcon from '../components/CreateAdIcon';
import MessageIcon from '../components/MessageIcon';
import HomeIcon from '../components/HomeIcon';
import AccountIcon from '../components/AccountIcon';
import { djangoConfig } from '../common/NetworkRequest';
import { BASE_URL } from '../common/API';
import axios from 'axios';

interface AdDataState {
  category: string;
  description: string;
  expiry: string;
  title: string;
  image: string;
  color: string;
}

const View_Post = ({ navigation, route }: { navigation: any; route: any }) => {
  // retrieve endpoint and postId from Post.tsx
  const { postId, endpoint } = route.params;
  //put default image/color instead of image type at this point. Confusing and giving error due to typescript nature. itll be overwritten anyway.
  const [adData, setAdData] = useState<AdDataState>({
    category: '',
    description: '',
    expiry: '',
    title: '',
    image: require('../assets/logo.png'),
    color: 'expiry_long',
  });
  const [isLoading, setIsLoading] = useState(true);
  const card_color_dict = assignColor(adData.color);
  const styles = generateViewPostStyles(card_color_dict);
  const [showNutIcon, setShowNutAllergyIcon] = useState(false);
  const [showGlutenFreeIcon, setShowGlutenFreeIcon] = useState(false);
  const [showVeganIcon, setShowVeganIcon] = useState(false);

  // Move checkDietaryOption to useEffect to avoid re-renders
  useEffect(() => {
    checkDietaryOption(adData.category);
  }, [adData.category]);

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
    setShowNutAllergyIcon(dietaryOptions.includes('peanut-free'));
    setShowGlutenFreeIcon(dietaryOptions.includes('gluten-free'));
    setShowVeganIcon(dietaryOptions.includes('vegan'));
  };

  const fetchBackend = async () => {
    try {
      const viewAds: string = endpoint + postId + '/';
      const payload: any = await axios.get(viewAds, djangoConfig());
      let data: JSON = payload.data;
      return data;
    } catch (e) {
      // display error on a screen would be nice.
      console.log(e);
      return undefined;
    }
  };

  useEffect(() => {
    const populateState = async () => {
      const data: any = await fetchBackend();
      if (data && data.image) {
        data.image = BASE_URL + data.image;
        setAdData(data);
        setIsLoading(false);
      } else {
        // exit or show a screen
        console.log('error retrieving payload');
      }
    };
    populateState();
  }, []);

  /**
   * Renders the front part of the post card.
   *
   * @function
   * @private
   * @returns {JSX.Element} The rendered front card component.
   */
  const render_Card_Front = (style: StyleProp<ViewStyle>) => {
    console.log(adData.category);
    return (
      <Card style={style}>
        <Card.Content style={styles.front_container}>
          <Title style={styles.title}>{adData.title}</Title>
          <Title style={styles.expiry}>{adData.expiry}</Title>
          <Text style={styles.description}>{adData.description}</Text>
          {render_Icons(
            styles.dietary_icons_wrapper,
            styles.dietary_icons,
            showNutIcon,
            showVeganIcon,
            showGlutenFreeIcon,
          )}
          <View style={styles.message_button}>
            <Button
              title="message"
              onPress={() => {
                console.log('hi');
              }}
              borderRadius={0.05 * Dimensions.get('window').width}
              color={card_color_dict.middleColor}
              borderColor={card_color_dict.middleColor}
              textColor={global.secondary}
            />
          </View>
        </Card.Content>
      </Card>
    );
  };

  if (isLoading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View style={globalscreenstyles.container}>
      <TabBarTop RightIcon={<MessageIcon></MessageIcon>}></TabBarTop>
      <View style={globalscreenstyles.middle}>
        <View style={styles.image_container}>
          {renderPostImage(styles.image, adData.image, 400)}
        </View>
        <View style={styles.info_container}>
          {render_Card_Back(styles.card_back)}
          {render_Card_Middle(styles.card_middle)}
          {render_Card_Front(styles.card_front)}
        </View>
      </View>
      <TabBarBottom
        LeftIcon={<HomeIcon></HomeIcon>}
        MiddleIcon={<CreateAdIcon></CreateAdIcon>}
        RightIcon={<AccountIcon></AccountIcon>}></TabBarBottom>
    </View>
  );
};

export default View_Post;
