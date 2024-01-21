import React from 'react';
import { View } from 'react-native';
import TabBarTop from '../components/TabBarTop';
import TabBarBottom from '../components/TabBarBottom';
import AccountIcon from '../components/AccountIcon';
import HomeIcon from '../components/HomeIcon';
import CreateAdIcon from '../components/CreateAdIcon';
import globalscreenstyles from '../common/global_ScreenStyles';

const Home = () => {
  return (
    <View style={globalscreenstyles.container}>
      <TabBarTop
        LeftIcon={<HomeIcon></HomeIcon>}
        MiddleIcon={<CreateAdIcon></CreateAdIcon>}
        RightIcon={<AccountIcon></AccountIcon>}></TabBarTop>
      <View style={globalscreenstyles.middle}></View>
      <TabBarBottom
        LeftIcon={<HomeIcon></HomeIcon>}
        MiddleIcon={<CreateAdIcon></CreateAdIcon>}
        RightIcon={<AccountIcon></AccountIcon>}></TabBarBottom>
    </View>
  );
};

export default Home;
