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
import Ratings from '../components/Ratings';
import HomeIcon from '../components/HomeIcon';
import AccountIcon from '../components/AccountIcon';
import { djangoConfig } from '../common/NetworkRequest';
import { BASE_URL } from '../common/API';
import axios from 'axios';
import { AdDataProps } from '../common/Types';
import GoBackIcon from '../components/GoBackIcon';
import Texts from '../components/Text';
import { SecureAPIReq } from '../common/NetworkRequest';
import { retrieveUserSession } from '../common/EncryptedSession';
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
    ratings: 0,
    username: '',
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
      // this is only for retrieving the ad data
      // remeber, we get the user_id from here
      const viewAds: string = endpoint + postId + '/';
      const payload: any = '';
      // this is a function that will eventually be populated here
      let newReq: any;

      // this is running 2 asynchronous operations at once and assigning them to the decalred variable above
      await Promise.all([
        async (payload: any) => {
          payload = await axios.get(viewAds, djangoConfig());
        },
        async (newReq: any) => {
          newReq = await SecureAPIReq.createInstance();
        },
      ]);

      let data: JSON = payload.data;
      // I am pretty sure this is it, but you might haft to change what the field is
      // this is for getting the user information
      //const user_id = data['user_id'];
      console.log('Payload:', data);
      console.log('test 1');
      console.log(data);
      // const user_id: string = (data as any)['user_id'];
      //newReq = await SecureAPIReq.createInstance();
      // const user_details = newReq.get(`/users/${user_id}`);
      // this is for getting the ratings
      // const ratings = newReq.get(`/ratings/${user_id}`);

      //last we will need to append all the data togehter

      //  const appendData = data + user_details.data.username + ratings.data;
      const appendData = data;

      return appendData;
    } catch (e) {
      // display error on a screen would be nice.
      const apiError: any = e;
      console.error(
        'Failed to fetch info:',
        apiError.response?.status,
        apiError.response?.data || apiError.message,
      );
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

  const [username, setUsername] = useState<string | null>(null);

  /*
  useEffect(() => {
    const fetchData = async () => {
      try {
        // const newReq: any = await SecureAPIReq.createInstance();

        // const userSesh: Record<string, string> = await retrieveUserSession();

        // const userId: string = userSesh['user_id'];

        // console.log(userId);

        // const res: any = await newReq.get(`users/${num}`);

        const newReq: any = await SecureAPIReq.createInstance();
        const postInfo: any = await newReq.get(`/ads/${postId}`);
        console.log(postInfo);
        const userId = postInfo.data;
        const res: any = await newReq.get(`users/${userId}`);

        console.log(res.data.username);
        const username = res.data.username;
        console.log(username);
        //   setUsername({ username });
      } catch (error) {
        const axiosError = error as any;

        if (axiosError.response) {
          // The request was made and the server responded with a status code
          console.error('Failed to fetch user info:', axiosError.response.data);
          console.error('Status Code:', axiosError.response.status);
          console.error('Headers:', axiosError.response.headers);
        } else if (axiosError.request) {
          // The request was made but no response was received
          console.error('Failed to fetch user info. No response received.');
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Error setting up the request:', axiosError.message);
        }
      }
    };
    fetchData();
  }, []);*/

  const [ratings, setRatings] = useState<number | undefined>(undefined);
  const [reviewsCount, setReviewsCount] = useState<number | undefined>(
    undefined,
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        //retrieves user id
        const newReq: any = await SecureAPIReq.createInstance();
        const userSesh: Record<string, string> = await retrieveUserSession();
        const userId: string = userSesh['user_id'];
        //attaches userid to the url
        const endpoint = `/ratings/${userId}`;
        const res = await newReq.get(endpoint);
        //rating itself
        setRatings(res.data.rating);
        //rating count
        setReviewsCount(res.data.count);
      } catch (error) {
        const apiError: any = error;
        console.error(
          'Failed to fetch rating info:',
          apiError.response?.status,
          apiError.response?.data || apiError.message,
        );
        //if it can't retreive ratings it will set it to zero. This accounts for specfically when the user has no ratings yet
        setReviewsCount(0);
        setRatings(0);
      }
    };

    fetchData();
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
          <Text style={{ fontSize: 20, color: global.secondary }}>
            {adData.username}
          </Text>
          <View style={styles.ratings}>
            <Ratings
              startingValue={adData.ratings}
              backgroundColor={global.tertiary}
              readonly={true}></Ratings>
          </View>
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
              backgroundcolor={card_color_dict.middleColor}
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
      <TabBarBottom
        LeftIcon={<HomeIcon></HomeIcon>}
        MiddleIcon={<CreateAdIcon></CreateAdIcon>}
        RightIcon={<AccountIcon></AccountIcon>}></TabBarBottom>
    </View>
  );
};

export default View_Post;
