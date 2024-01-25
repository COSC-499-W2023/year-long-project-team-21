import React from 'react';
import { View } from 'react-native';
import UserInfo from '../components/UserInfo';
import globalscreenstyles from '../common/global_ScreenStyles';
import TabBarTop from '../components/TabBarTop';
import AccountIcon from '../components/AccountIcon';
import HomeIcon from '../components/HomeIcon';
import CreateAdIcon from '../components/CreateAdIcon';
import TabBarBottom from '../components/TabBarBottom';
import MessageIcon from '../components/MessageIcon';

const Profile = () => {
  return (
    <View style={globalscreenstyles.container}>
      <TabBarTop RightIcon={<MessageIcon></MessageIcon>}></TabBarTop>
      <View style={globalscreenstyles.middle}>
        <UserInfo userInfoKeys={['username', 'email']}></UserInfo>
      </View>

      <TabBarBottom
        LeftIcon={<HomeIcon></HomeIcon>}
        MiddleIcon={<CreateAdIcon></CreateAdIcon>}
        RightIcon={<AccountIcon></AccountIcon>}></TabBarBottom>
    </View>
  );
};

export default Profile;
