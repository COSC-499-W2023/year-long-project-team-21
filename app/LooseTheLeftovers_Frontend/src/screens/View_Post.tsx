import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  StyleProp,
  Text,
  View,
  ViewStyle,
  ActivityIndicator,
  Modal,
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
import { djangoConfig, SecureAPIReq } from '../common/NetworkRequest';
import { BASE_URL, adEndpoint, usersAds } from '../common/API';
import axios from 'axios';
import { AdDataProps } from '../common/Types';
import GoBackIcon from '../components/GoBackIcon';
import LinearGradient from 'react-native-linear-gradient';
import { retrieveUserSession } from '../common/EncryptedSession';

/**
 * React component for viewing a post.
 *
 * @component
 * @param {object} props - The props object.
 * @param {object} props.navigation - The navigation object.
 * @param {object} props.route - The route object.
 * @returns {JSX.Element} A JSX Element representing the View_Post component.
 */
const View_Post = ({ navigation, route }: { navigation: any; route: any }) => {

  // retrieve endpoint and postId from Post.tsx
  const { postId, endpoint } = route.params;
  interface data {
    category: '';
    description: '';
    expiry: '';
    title: '';
    image: any;
    color: 'expiry_long';
    username: '';
    ratings: 0;
    count: 0;
  }
  //put default image/color instead of image type at this point. Confusing and giving error due to typescript nature. itll be overwritten anyway.
  const [adData, setAdData] = useState<AdDataProps>({
    category: '',
    description: '',
    expiry: '',
    title: '',
    image: require('../assets/logo.png'),
    color: 'expiry_long',
    username: '',
    ratings: 0,
    count: 0,
  });
  // Retrieve endpoint and postId from Post.tsx
  const { postId, endpoint } = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const card_color_dict = assignColor(adData.color);
  const styles = generateViewPostStyles(card_color_dict);
  const [showNutIcon, setShowNutAllergyIcon] = useState(false);
  const [showGlutenFreeIcon, setShowGlutenFreeIcon] = useState(false);
  const [showVeganIcon, setShowVeganIcon] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
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
      let payload: any;
      let newReq: any;

      //load both at the same time
      await Promise.all([
        axios.get(viewAds, djangoConfig()).then(response => {
          payload = response;
        }),
        SecureAPIReq.createInstance().then(instance => {
          newReq = instance;
        }),
      ]);

      let data: data = payload.data;
      const user_id = (data as any).user_id;

      newReq = await SecureAPIReq.createInstance();

      const user_details: any = await newReq.get(`users/${user_id}`);

      try {
        //append ratings and ratings count
        const user_ratings: any = await newReq.get(`/ratings/${user_id}`);
        data.ratings = user_ratings.data.rating;
        data.count = user_ratings.data.count;
      } catch {
        //if there are no ratings, set both to zero
        data.ratings = 0;
        data.count = 0;
      }

      //append username to data
      data.username = user_details.data.username;
      return data;
    } catch (e) {
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

    /**
     * Renders the message button component.
     *
     * @function
     * @private
     * @returns {JSX.Element} The rendered message button component.
     */
    const renderMessageButton = () => {
      return (
        <View style={styles.message_button}>
          <Button
            title="message"
            onPress={() => {
              console.log('hi');
            }}
            borderRadius={0.05 * Dimensions.get('window').width}
            backgroundcolor={card_color_dict.middleColor}
            borderColor={card_color_dict.middleColor}
            textColor={global.secondary}
          />
        </View>
      );
    };

    /**
     * Renders the delete button component.
     *
     * @function
     * @private
     * @returns {JSX.Element} The rendered delete button component.
     */
    const renderDeleteButton = () => {
      return (
        <View style={styles.message_button}>
          <Button
            title="Delete"
            onPress={() => setIsVisible(true)}
            borderRadius={0.05 * Dimensions.get('window').width}
            backgroundcolor={card_color_dict.middleColor}
            borderColor={card_color_dict.middleColor}
            textColor={global.secondary}
          />
        </View>
      );
    };

    /**
     * Checks if the previous page is the Profile page.
     *
     * @function
     * @private
     * @returns {boolean} Indicates whether the previous page is the Profile page.
     */
    const IsPrevPageProfile = () => {
      const routes = navigation.getState()?.routes;
      const prevRoute = routes[routes.length - 2];
      return prevRoute?.name === 'Profile';
    };

    /**
     * Renders either the delete button or the message button based on the previous page.
     *
     * @function
     * @private
     * @returns {JSX.Element} The rendered button component.
     */
    const renderButton = () => {
      return IsPrevPageProfile() ? renderDeleteButton() : renderMessageButton();
    };

    return (
      <Card style={style}>
        <Card.Content style={styles.front_container}>
          <Title style={styles.title}>{adData.title}</Title>
          <Title
            style={[{ color: card_color_dict.middleColor }, styles.expiry]}>
            {adData.expiry}
          </Title>
          <Text style={styles.description}>{adData.description}</Text>
          {render_Icons(
            styles.dietary_icons_wrapper,
            styles.dietary_icons,
            showNutIcon,
            showGlutenFreeIcon,
            showVeganIcon,
          )}
          <View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>
                {adData.username} {'  '}
              </Text>
              <View style={styles.ratings}>
                <Ratings
                  startingValue={adData.ratings}
                  backgroundColor={global.tertiary}
                  readonly={true}></Ratings>
                <Text style={{ color: global.secondary }}>
                  ({adData.count})
                </Text>
              </View>
            </View>
          </View>

          {renderButton()}
        </Card.Content>
      </Card>
    );
  };

  /**
   * Renders the delete confirmation modal.
   *
   * @function
   * @private
   * @returns {JSX.Element} The rendered delete confirmation modal.
   */
  const renderDeleteConfimation = () => {
    return (
      <Modal visible={isVisible}>
        <LinearGradient
          style={styles.modal_container}
          colors={['#251D3A', global.background]}
          start={{ x: 1, y: 0 }}>
          <Text style={styles.modal_title}>
            Are you sure to delete this post?
          </Text>
          <View style={styles.modal_button_container}>
            <Button
              backgroundcolor="red"
              buttonSize={150}
              onPress={() => setIsVisible(false)}
              title="Cancel"></Button>
            <Button
              buttonSize={150}
              onPress={deletePost}
              title="Confirm"></Button>
          </View>
        </LinearGradient>
      </Modal>
    );
  };

  /**
   * Deletes the post.
   *
   * @function
   * @private
   * @returns {void}
   */
  const deletePost = async () => {
    console.log('post delete request starts...');
    setIsVisible(true);
    try {
      const deleteAds: string = adEndpoint;
      console.log(deleteAds);
      console.log(postId);
      const req: any = await SecureAPIReq.createInstance();
      const payload: any = await req.delete(deleteAds, {
        ad_id: postId,
      });
      console.log(payload.status);
      if (payload.status == 200) {
        console.log('deletion completed!');
        navigation.navigate('DoneDelete');
      }
    } catch (error) {
      console.log(error);
    } finally {
      console.log('post delete request ends...');
    }
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
      {renderDeleteConfimation()}
      <TabBarBottom
        LeftIcon={<HomeIcon />}
        MiddleIcon={<CreateAdIcon />}
        RightIcon={<AccountIcon />}
      />
    </View>
  );
};

export default View_Post;
