import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import UserInfo from '../components/UserInfo';
import globalscreenstyles from '../common/global_ScreenStyles';
import TabBarTop from '../components/TabBarTop';
import AccountIcon from '../components/AccountIcon';
import HomeIcon from '../components/HomeIcon';
import CreateAdIcon from '../components/CreateAdIcon';
import TabBarBottom from '../components/TabBarBottom';
import MessageIcon from '../components/MessageIcon';
import {
  removeUserSession,
  retrieveUserSession,
} from '../../src/common/EncryptedSession';
import { SecureAPIReq } from '../../src/common/NetworkRequest';
import Button from '../components/Button';
import profileStyles from '../styles/profileStyles';

const Profile = ({ navigation }: { navigation: any }) => {
  const [userInfo, setUserInfo] = useState({ username: '', email: '' });

  const handleButtonOnPress = async () => {
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

  const fetchUserInfo = async () => {
    try {
      // Retrieve session data
      const userSesh: Record<string, string> = await retrieveUserSession();

      const newReq: SecureAPIReq = await SecureAPIReq.createInstance();

      // Gets user id from session data
      const userId: string = userSesh['user_id'];
      console.log(userId);

      const res: any = await newReq.get(`users/${userId}`);

      // Retrieves user data using userid

      const data = res.data;

      setUserInfo({ username: data.username, email: data.email });
    } catch (error) {
      console.error('Failed to fetch user info:', error);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <View style={globalscreenstyles.container}>
      <TabBarTop RightIcon={<MessageIcon />} />
      <View style={globalscreenstyles.middle}>
        <View style={profileStyles.userinfocontainer}>
          <UserInfo userInfo={userInfo} userInfoKeys={['username', 'email']} />
        </View>

        <View style={profileStyles.button}>
          <Button onPress={handleButtonOnPress} title="Logout"></Button>
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

export default Profile;
