import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import globalscreenstyles from '../common/global_ScreenStyles';
import TabBarTop from '../components/TabBarTop';
import AccountIcon from '../components/AccountIcon';
import HomeIcon from '../components/HomeIcon';
import CreateAdIcon from '../components/CreateAdIcon';
import TabBarBottom from '../components/TabBarBottom';
import MessageIcon from '../components/MessageIcon';
import { global } from '../common/global_styles';
import {
  removeUserSession,
  retrieveUserSession,
} from '../../src/common/EncryptedSession';
import { SecureAPIReq } from '../../src/common/NetworkRequest';
import PostListRenderer from '../components/PostListRenderer';
import { adEndpoint, usersAds } from '../common/API';
import profileStyles from '../styles/profileStyles';
import LinearGradient from 'react-native-linear-gradient';
import Logo from '../components/Logo';
import UserInfo from '../components/UserInfo';
import Button from '../components/Button';
import Ratings from '../components/Ratings';
import Texts from '../components/Text';

const Profile = ({ navigation }: { navigation: any }) => {
  const [userID, setUserId] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({ username: '', email: '' });
  const [ratings, setRatings] = useState<number | undefined>(undefined);
  const [reviewsCount, setReviewsCount] = useState<number | undefined>(
    undefined,
  );
  const [page, setPageNumber] = useState(1);

  useEffect(() => {
    fetchUserInfo();
  }, []);

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
        navigation.navigate('Registration');
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
    navigation.navigate('EditProfile', { userId: userID });
  };

  /**
   * Fetches user information from the backend.
   *
   * @returns {void}
   */
  const fetchUserInfo = async () => {
    try {
      // init class for new request
      const newReq: any = await SecureAPIReq.createInstance();
      // Retrieve session data
      const userSesh: Record<string, string> = await retrieveUserSession();
      // Gets user id from session data
      const userId: string = userSesh['user_id'];
      // set state appropriately
      setUserId(userId);
      // call backend to retrieve
      const res: any = await newReq.get(`users/${userId}/`);
      // set state
      setUserInfo({ username: res.data.username, email: res.data.email });
      // no longer loading (wonder if nec?)
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to fetch user info:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        //retrieves user id
        const newReq: any = await SecureAPIReq.createInstance();
        const userSesh: Record<string, string> = await retrieveUserSession();
        const userId: string = userSesh['user_id'];
        //attaches userid to the url
        const endpoint = `/ratings/${userId}`;
        console.log('Request Details:', { endpoint });
        const res = await newReq.get(endpoint);
        //rating itself
        setRatings(res.data.rating);
        console.log(res.data.rating);
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

  // function passed down as a prop to handle retrieving ads for users
  async function fetchAds(pageNumber: number) {
    const req: any = await SecureAPIReq.createInstance();
    const endpoint: string = `${usersAds}${userID}/?page=${pageNumber}`;
    const payload: any = await req.get(endpoint);
    return payload;
  }

  return (
    <LinearGradient
      style={globalscreenstyles.container}
      colors={[global.purple, global.background]}
      start={{ x: 1, y: 0 }}>
      <TabBarTop LeftIcon={<Logo size={55} />} RightIcon={<MessageIcon />} />
      <View style={globalscreenstyles.middle}>
        {isLoading ? (
          <ActivityIndicator size="large" /> // or <Text>Loading...</Text> if you just want text
        ) : (
          <>
            <View style={profileStyles.userinfocontainer}>
              <UserInfo
                userInfo={userInfo}
                userInfoKeys={['username', 'email']}
              />
              <View style={{ marginTop: '-15%' }}>
                <Ratings
                  startingValue={ratings}
                  readonly={true}
                  backgroundColor={global.tertiary}></Ratings>
                <Texts
                  textsColor={global.secondary}
                  textsSize={15}
                  texts={`(${reviewsCount} Reviews)`}></Texts>
              </View>

              <View style={profileStyles.button}>
                <Button
                  onPress={handleLoginButtonOnPress}
                  title="Logout"></Button>
              </View>
            </View>
            <View style={profileStyles.viewPost}>
              <PostListRenderer
                endpoint={adEndpoint}
                getData={fetchAds}
                navigation={navigation}
                handleEditOnpress={handleEditButtonOnPress}
                handleLoginOnpress={handleLoginButtonOnPress}
                userInfo={userInfo!}
                rating={ratings!}
                reviewsCount={reviewsCount}
                page={page}
                setPageNumber={setPageNumber}
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
