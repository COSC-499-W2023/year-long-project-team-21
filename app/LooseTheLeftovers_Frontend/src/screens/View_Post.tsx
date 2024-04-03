import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  StyleProp,
  Text,
  View,
  ViewStyle,
  ActivityIndicator,
} from 'react-native';
import { Card, Title } from 'react-native-paper';
import axios from 'axios';

import generateViewPostStyles from '../styles/view_postStyles';
import globalscreenstyles from '../common/global_ScreenStyles';
import { global } from '../common/global_styles';
import { retrieveUserSession } from '../common/EncryptedSession';

import {
  renderPostImage,
  render_Card_Back,
  render_Card_Middle,
  render_Icons,
  assignColor,
} from '../common/postUtils';
import { djangoConfig } from '../common/NetworkRequest';
import { BASE_URL } from '../common/API';
import { AdDataProps } from '../common/Types';
import ChatService from '../common/ChatService';

import Button from '../components/Button';
import TabBarTop from '../components/TabBarTop';
import TabBarBottom from '../components/TabBarBottom';
import CreateAdIcon from '../components/CreateAdIcon';
import Ratings from '../components/Ratings';
import HomeIcon from '../components/HomeIcon';
import AccountIcon from '../components/AccountIcon';
import GoBackIcon from '../components/GoBackIcon';

const View_Post = ({ navigation, route }: { navigation: any; route: any }) => {
  // Put default image/color instead of image type at this point. Confusing and giving error due to typescript nature. It'll be overwritten anyway.
  const [adData, setAdData] = useState<AdDataProps>({
    category: '',
    description: '',
    expiry: '',
    title: '',
    image: require('../assets/logo.png'),
    color: 'expiry_long',
  });
  // Retrieve endpoint and postId from Post.tsx
  const { postId, endpoint } = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const card_color_dict = assignColor(adData.color);
  const styles = generateViewPostStyles(card_color_dict);
  const [showNutIcon, setShowNutAllergyIcon] = useState(false);
  const [showGlutenFreeIcon, setShowGlutenFreeIcon] = useState(false);
  const [showVeganIcon, setShowVeganIcon] = useState(false);
  const [user_id, setUserId] = useState('');
  const your_id = useRef(null);

  // Get current user id
  useEffect(() => {
    const getSessionAndSetUserId = async () => {
      const session = await retrieveUserSession();
      if (session && session.user_id) {
        your_id.current = session.user_id;
      }
    };
    getSessionAndSetUserId();
  }, []);

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
      // Display an error screen would be nice.
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
        setUserId(data.user_id);
      } else {
        // Exit or show a screen
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
          <View style={styles.ratings}>
            <Ratings backgroundColor={global.tertiary} readonly={true} />
          </View>
          <Title style={styles.expiry}>{adData.expiry}</Title>
          <Text style={styles.description}>{adData.description}</Text>

          {render_Icons(
            styles.dietary_icons_wrapper,
            styles.dietary_icons,
            showNutIcon,
            showGlutenFreeIcon,
            showVeganIcon,
          )}
          {your_id.current !== user_id && (
            <View style={styles.message_button}>
              <Button
                title="message"
                onPress={handlePressMessage}
                borderRadius={0.05 * Dimensions.get('window').width}
                backgroundcolor={card_color_dict.middleColor}
                borderColor={card_color_dict.middleColor}
                textColor={global.secondary}
              />
            </View>
          )}
        </Card.Content>
      </Card>
    );
  };

  if (isLoading) {
    return <ActivityIndicator size="large" />;
  }

  const handlePressMessage = async () => {
    try {
      const response = await ChatService.checkHistory(user_id, postId);

      if (response) {
        console.log('View_Post: Chat exists');
        navigation.navigate('Chat', {
          user_id: user_id,
          ad_id: postId,
          new_chat: false,
          your_id: your_id.current,
        });
      } else {
        console.log('View_Post: No history');
        navigation.navigate('Chat', {
          user_id: user_id,
          ad_id: postId,
          new_chat: true,
          your_id: your_id.current,
        });
      }
    } catch (error) {
      console.error('View_Post: Error sending message:', error);
    }
  };

  return (
    <View style={globalscreenstyles.container}>
      <TabBarTop LeftIcon={<GoBackIcon />} />
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
        LeftIcon={<HomeIcon />}
        MiddleIcon={<CreateAdIcon />}
        RightIcon={<AccountIcon />}
      />
    </View>
  );
};

export default View_Post;
