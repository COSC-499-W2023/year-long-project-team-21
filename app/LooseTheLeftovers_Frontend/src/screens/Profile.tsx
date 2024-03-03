import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import UserInfo from '../components/UserInfo';
import globalscreenstyles from '../common/global_ScreenStyles';
import TabBarTop from '../components/TabBarTop';
import AccountIcon from '../components/AccountIcon';
import HomeIcon from '../components/HomeIcon';
import CreateAdIcon from '../components/CreateAdIcon';
import TabBarBottom from '../components/TabBarBottom';
import MessageIcon from '../components/MessageIcon';
import { global } from '../common/global_styles';
import Ratings from '../components/Ratings';
import {
  removeUserSession,
  retrieveUserSession,
} from '../../src/common/EncryptedSession';
import { SecureAPIReq } from '../../src/common/NetworkRequest';
import PostListRenderer from '../components/PostListRenderer';
import { adEndpoint, usersAds } from '../common/API';
import profileStyles from '../styles/profileStyles';
import Button from '../components/Button';
import { Modal, Text } from 'react-native-paper';
import InputField from '../components/InputField';
import LinearGradient from 'react-native-linear-gradient';
import styles from '../styles/registrationStyles';
import axios from 'axios';

const Profile = ({ navigation }: { navigation: any }) => {
  const [userID, setUserId] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({ username: '', email: '' });
  const [data, setData] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [newEmail, setNewEmail] = useState(userInfo.email);
  const [newUsername, setNewUsername] = useState(userInfo.username);

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
    console.log('edit profile!');
    setIsVisible(true);
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

  // function passed down as a prop to handle retrieivng ads for users
  async function fetchAds(pageNumber: number) {
    const req: SecureAPIReq = await SecureAPIReq.createInstance();
    const endpoint: string = `${usersAds}${userID}/?page=${pageNumber}`;
    const payload: any = await req.get(endpoint);
    return payload;
  }

  useEffect(() => {
    fetchUserInfo();
  }, []);

  if (isLoading) {
    // @ todo find one that is not so intruisvie.
    return <ActivityIndicator size="large" />;
  }

  /**
   * Callback function for handling completion of rating.
   *
   * @param {number} rating - The rating value.
   * @returns {void}
   */
  //this is for when backend is implementated
  const ratingCompleted = (rating: number) => {
    console.log(rating);
  };

  /**
   * Handles button press event to cancel profile editing.
   *
   * @returns {void}
   */
  const handleCancelEditing = () => {
    setIsVisible(false);
  };

  /**
   * Handles the submission of new profile information.
   * This function logs the submission details, updates the local state with new username and email,
   * and sends a request to update the user's profile information.
   *
   * @returns {void}
   */
  const handleNewProfileInfoSubmission = async () => {
    console.log('request is submitted');
    console.log('new username: ', newUsername);
    console.log('new email: ', newEmail);
    console.log();
    //check username and email input format
    try {
      setNewUsername(userInfo.username);
      setNewEmail(userInfo.email);
      // const apiUrl = 'http://10.0.2.2:8000/users/';

      // const response = await axios.post(apiUrl, {
      //   username: newUsername,
      //   email: newEmail,
      // });

      // const { data } = response;

      // Check response successful
      // if (response.status === 200) {
      //   console.log('request is submitted');
      // } else {
      //   //red text error produced by server
      //   console.log("server error")
      // }
    } catch (error: any) {
      //red text error produced by requesting error
      console.log(error);
    }
  };

  /**
   * Renders the modal screen for editing profile information.
   *
   * @returns {JSX.Element} - JSX element representing the modal screen.
   */
  const renderModalScreen = () => {
    return (
      <Modal visible={isVisible}>
        <LinearGradient
          colors={['#251D3A', global.background]}
          start={{ x: 1, y: 0 }}>
          <View style={profileStyles.modalContainer}>
            <View>
              <Text style={profileStyles.modalTitle}>Edit Profile</Text>
            </View>
            <View>
              <InputField
                placeholder={userInfo.username}
                onChangeText={newNameText => setNewUsername(newNameText)}
                value={newUsername}></InputField>
              <InputField
                placeholder={userInfo.email}
                onChangeText={newText => setNewEmail(newText)}
                value={newEmail}></InputField>
            </View>
            <View style={profileStyles.modalButtonContainer}>
              <Button
                backgroundcolor="red"
                buttonSize={150}
                onPress={handleCancelEditing}
                title="cancel"></Button>
              <Button
                buttonSize={150}
                onPress={handleNewProfileInfoSubmission}
                title="Save"></Button>
            </View>
          </View>
        </LinearGradient>
      </Modal>
    );
  };

  return (
    <View style={globalscreenstyles.container}>
      <TabBarTop RightIcon={<MessageIcon />} />
      <View style={globalscreenstyles.middle}>
        <View style={profileStyles.viewPost}>
          <PostListRenderer
            isHeaderInNeed={false}
            endpoint={adEndpoint}
            getData={fetchAds}
            navigation={navigation}
            handleEditOnpress={handleEditButtonOnPress}
            handleLoginOnpress={handleLoginButtonOnPress}
            userInfo={userInfo!}
            ratingCompleted={ratingCompleted(0)!}
          />
        </View>
      </View>
      {renderModalScreen()}
      <TabBarBottom
        LeftIcon={<HomeIcon />}
        MiddleIcon={<CreateAdIcon />}
        RightIcon={<AccountIcon />}
      />
    </View>
  );
};

export default Profile;
