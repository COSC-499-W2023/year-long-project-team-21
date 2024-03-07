import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  StyleProp,
  Text,
  View,
  ViewStyle,
  ActivityIndicator,
  Modal,
} from 'react-native';
import globalscreenstyles from '../common/global_ScreenStyles';
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
import Ratings from '../components/Ratings';
import HomeIcon from '../components/HomeIcon';
import AccountIcon from '../components/AccountIcon';
import { djangoConfig, SecureAPIReq } from '../common/NetworkRequest';
import { BASE_URL, adEndpoint, usersAds } from '../common/API';
import axios from 'axios';
import { AdDataProps } from '../common/Types';
import GoBackIcon from '../components/GoBackIcon';
import LinearGradient from 'react-native-linear-gradient';

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
  //put default image/color instead of image type at this point. Confusing and giving error due to typescript nature. itll be overwritten anyway.
  const [adData, setAdData] = useState<AdDataProps>({
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
  const [isVisible, setIsVisible] = useState(false);
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
      const viewAds: string = endpoint + postId;
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
          <View style={styles.ratings}>
            <Ratings
              backgroundColor={global.tertiary}
              readonly={true}></Ratings>
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
      const deleteAds: string = adEndpoint ;
      console.log(deleteAds);
      console.log(postId)
      const req: any = await SecureAPIReq.createInstance();
      const payload: any = await req.delete(deleteAds, {
        ad_id: postId
      });
      console.log(payload.status)
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

  return (
    <View style={globalscreenstyles.container}>
      <TabBarTop LeftIcon={<GoBackIcon></GoBackIcon>}></TabBarTop>
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
        LeftIcon={<HomeIcon></HomeIcon>}
        MiddleIcon={<CreateAdIcon></CreateAdIcon>}
        RightIcon={<AccountIcon></AccountIcon>}></TabBarBottom>
    </View>
  );
};

export default View_Post;
