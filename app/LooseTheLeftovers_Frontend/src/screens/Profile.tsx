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
import PostListRenderer from '../components/PostListRenderer';
import { adEndpoint } from '../common/API';

const Profile = () => {
  const [userID, setUserId] = useState('');
  const [userInfo, setUserInfo] = useState({ username: '', email: '' });

  const fetchUserInfo = async () => {
    try {
      // Retrieve session data
      const userSesh: Record<string, string> = await retrieveUserSession();
      // Gets user id from session data
      setUserId(userSesh['user_id']);

      // Retrieves user data using userid
      const newReq: SecureAPIReq = await SecureAPIReq.createInstance();
      const res: any = await newReq.get(`users/${userID}/`);

      const data = res.data;

      setUserInfo({ username: data.username, email: data.email });
    } catch (error) {
      console.error('Failed to fetch user info:', error);
    }
  };

  useEffect(() => {
    fetchUserInfo();
    console.log('this is userId', userID);
  }, []);

  return (
    <View style={globalscreenstyles.container}>
      <TabBarTop RightIcon={<MessageIcon />} />

      <View style={globalscreenstyles.middle}>
        <UserInfo userInfo={userInfo} userInfoKeys={['username', 'email']} />
      </View>

      <View style={globalscreenstyles.middle}>
        <PostListRenderer isHeaderInNeed={false} endpoint={adEndpoint} />
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
