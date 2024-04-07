import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, Text, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import globalscreenstyles from '../common/global_ScreenStyles';
import { global } from '../common/global_styles';
import { SecureAPIReq } from '../../src/common/NetworkRequest';
import { adEndpoint, usersAds } from '../common/API';
import { useChat } from '../common/ChatContext';
import {
  removeUserSession,
  retrieveUserSession,
} from '../../src/common/EncryptedSession';

import generatePostListStyles from '../styles/postListStyles';
import profileStyles from '../styles/profileStyles';
import PostListRenderer from '../components/PostListRenderer';
import TabBarTop from '../components/TabBarTop';
import TabBarBottom from '../components/TabBarBottom';
import AccountIcon from '../components/AccountIcon';
import HomeIcon from '../components/HomeIcon';
import CreateAdIcon from '../components/CreateAdIcon';
import MessageIcon from '../components/MessageIcon';
import UserInfo from '../components/UserInfo';
import Icon from '../components/Icon';
import Ratings from '../components/Ratings';
import Texts from '../components/Text';
import Button from '../components/Button';
import Logo from '../components/Logo';

const Profile = ({ navigation }: { navigation: any }) => {
  const screenWidth = Dimensions.get('window').width;
  const postListStyles = generatePostListStyles(screenWidth);
  const [userId, setUserId] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({ username: '', email: '' });
  const [ratings, setRatings] = useState<number | undefined>(undefined);
  const [reviewsCount, setReviewsCount] = useState<number | undefined>(
    undefined,
  );
  const [key, setKey] = useState(Math.random());
  const [data, setData] = useState('');
  const { updateLoggedIn } = useChat();

  /**
   * Handles button press event to log out the user.
   *
   * @returns {void}
   */
  const handleLoginButtonOnPress = async () => {
    try {
      // Retrieve the current user session
      const session = await retrieveUserSession();

      if (session) {
        // Remove the user session
        await removeUserSession();
        updateLoggedIn(false);
        navigation.navigate('Login');
      } else {
        throw new Error('No active user session found');
      }
    } catch (error) {
      // Handle errors
      console.error('Error during logout:', error);
    }
  };

  /**
   * Handles button press event to initiate profile editing.
   *
   * @returns {void}
   */
  const handleEditButtonOnPress = async () => {
    navigation.navigate('EditProfile', { userId: userId });
  };

  const getUserID = async () => {
    const sesh = await retrieveUserSession();
    const user_id = sesh.user_id;
    setUserId(user_id);
  };

  /**
   * Fetches user information from the backend.
   *
   * @returns {void}
   */
  const fetchUserInfo = async (newReq: any) => {
    try {
      // call backend to retrieve
      const res: any = await newReq.get(`users/${userId}/`);
      // set state
      setUserInfo({ username: res.data.username, email: res.data.email });
    } catch (error) {
      console.error('Failed to fetch user info:', error);
    }
  };

  /**
   * Fetches the rating and review count for a given user.
   *
   * This function makes an HTTP GET request to retrieve the user's ratings and review count.
   * Upon a successful response, it updates the relevant state. If the request fails or if the
   * user has no ratings, it sets the ratings and review counts to zero.
   *
   * @param {object} newReq - The instance of the request object to make the HTTP call.
   */
  const fetchRatings = async (newReq: any) => {
    try {
      //attaches userid to the url
      const endpoint = `/ratings/${userId}`;
      const res = await newReq.get(endpoint);
      //rating itself
      setRatings(res.data.rating || 0);
      setReviewsCount(res.data.count || 0);
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

  useEffect(() => {
    getUserID();
  }, []);

  useEffect(() => {
    setKey(Math.random());

    return () => {};
  }, []);

  useEffect(() => {
    const makeReq = async () => {
      try {
        const newReq: any = await SecureAPIReq.createInstance();
        await Promise.all([fetchUserInfo(newReq), fetchRatings(newReq)]);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    if (userId) {
      makeReq();
      setIsLoading(false);
    }
  }, [userId]);

  // function passed down as a prop to handle retrieving ads for users
  async function fetchUserAds(pageNumber: number) {
    const req: any = await SecureAPIReq.createInstance();
    const endpoint: string = `${usersAds}${userId}/?page=${pageNumber}`;
    console.log(endpoint);
    const payload: any = await req.get(endpoint);
    return payload;
  }

  function profileHeader(): React.ReactElement {
    return (
      <View style={profileStyles.userinfocontainer}>
        <UserInfo userInfo={userInfo!} userInfoKeys={['username', 'email']} />
        <View style={postListStyles.editIconContainer}>
          <Icon
            source={require('../assets/edit_white.png')}
            size={25}
            onPress={handleEditButtonOnPress}
          />
        </View>
        <View style={profileStyles.ratingContainer}>
          <Ratings
            startingValue={ratings}
            readonly={true}
            backgroundColor={global.tertiary}></Ratings>
          <Texts
            textsColor={global.secondary}
            textsSize={15}
            texts={`(${reviewsCount} Reviews)`}></Texts>
        </View>
        <View style={profileStyles.button_container}>
          <View>
            <Button onPress={handleLoginButtonOnPress!} title="Logout"></Button>
          </View>
        </View>
      </View>
    );
  }

  return (
    <LinearGradient
      style={globalscreenstyles.container}
      colors={[global.purple, global.background]}
      start={{ x: 1, y: 0 }}>
      <TabBarTop LeftIcon={<Logo size={55} />} RightIcon={<MessageIcon />} />
      <View style={globalscreenstyles.middle}>
        {isLoading ? (
          <ActivityIndicator size="large" />
        ) : (
          <>
            <View style={profileStyles.viewPost}>
              <PostListRenderer
                endpoint={adEndpoint}
                getData={fetchUserAds}
                navigation={navigation}
                whichHeader={profileHeader}
              />
            </View>
          </>
        )}
      </View>
      <TabBarBottom
        LeftIcon={<HomeIcon />}
        MiddleIcon={<CreateAdIcon />}
        RightIcon={<AccountIcon />}
      />
    </LinearGradient>
  );
};

export default Profile;
