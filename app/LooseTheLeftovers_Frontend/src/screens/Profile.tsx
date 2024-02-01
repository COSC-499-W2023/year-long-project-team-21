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
import { retrieveUserSession } from '../../src/common/EncryptedSession';
import { SecureAPIReq } from '../../src/common/NetworkRequest';
import PostListRenderer from '../components/PostListRenderer';
import { adEndpoint, usersAds } from '../common/API';

const Profile = ({ navigation }: { navigation: any }) => {
  const [userID, setUserId] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({ username: '', email: '' });
  const [data, setData] = useState('');

  const fetchUserInfo = async () => {
    try {
      // Retrieve session data
      const userSesh: Record<string, string> = await retrieveUserSession();
      // Gets user id from session data
      const userId: string = userSesh['user_id'];
      setUserId(userId);

      // Retrieves user data using userid
      const newReq: SecureAPIReq = await SecureAPIReq.createInstance();
      const res: any = await newReq.get(`users/${userId}/`);
      //let data = res.data;
      setUserInfo({ username: res.data.username, email: res.data.email });

      setIsLoading(false);
    } catch (error) {
      console.error('Failed to fetch user info:', error);
    }
  };

  // function passed down as a prop to handle retrieivng ads for users
  async function fetchAds() {
    const newReq: SecureAPIReq = await SecureAPIReq.createInstance();
    const endpoint: string = usersAds + userID + '/';
    const payload: any = await newReq.get(endpoint);
    return payload.data;
  }

  useEffect(() => {
    fetchUserInfo();
  }, []);

  if (isLoading) {
    // @ todo find one that is not so intruisvie.
    return <ActivityIndicator size="large" />;
  }

  return (
    <View style={globalscreenstyles.container}>
      <TabBarTop RightIcon={<MessageIcon />} />

      <View style={globalscreenstyles.middle}>
        <UserInfo userInfo={userInfo} userInfoKeys={['username', 'email']} />
      </View>

      <View style={globalscreenstyles.middle}>
        <PostListRenderer
          isHeaderInNeed={false}
          endpoint={adEndpoint}
          getData={fetchAds}
          navigation={navigation}
        />
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
