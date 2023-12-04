import React from 'react';
import { View } from 'react-native';
import TabBar from '../components/TabBar';

import globalscreenstyles from '../common/global_ScreenStyles';

import Logo from '../components/Logo';
import CreateAdIcon from '../components/CreateAdIcon';
import MessageIcon from '../components/MessageIcon';
import HomeIcon from '../components/HomeIcon';
import AccountIcon from '../components/AccountIcon';
import LocationService from '../common/LocationService';

const Home = ({ navigation }: { navigation: any }) => {
  const locationInstance = LocationService.CreateAndInitialize();
  return (
    <View style={globalscreenstyles.container}>
      <TabBar
        LeftIcon={<Logo LogoSize={15}></Logo>}
        RightIcon={<MessageIcon></MessageIcon>}></TabBar>

      <View style={globalscreenstyles.body}></View>

      <TabBar
        LeftIcon={<HomeIcon></HomeIcon>}
        MiddleIcon={<CreateAdIcon></CreateAdIcon>}
        RightIcon={<AccountIcon></AccountIcon>}></TabBar>
    </View>
  );
};

export default Home;
