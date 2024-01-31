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
import { retrieveUserSession } from '../../src/common/EncryptedSession';
import { SecureAPIReq } from '../../src/common/NetworkRequest';

const Profile = () => {
  const [userInfo, setUserInfo] = useState({ username: '', email: '' });

  const fetchUserInfo = async () => {
    try {
      // Retrieve session data
      const userSesh: Record<string, string> = await retrieveUserSession();
      // Gets user id from session data
      const userId: string = userSesh['user_id'];
      console.log(userId);

      // Retrieves user data using userid
      const newReq: SecureAPIReq = await SecureAPIReq.createInstance();
      const res: any = await newReq.get(`users/${userId}`);

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
        <UserInfo userInfo={userInfo} userInfoKeys={['username', 'email']} />
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
