import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import TabBar from '../components/TabBar';

import globalscreenstyles from '../common/global_ScreenStyles';
import { global } from '../common/global_styles';
import Logo from '../components/Logo';
import CreateAdIcon from '../components/CreateAdIcon';
import MessageIcon from '../components/MessageIcon';
import HomeIcon from '../components/HomeIcon';
import AccountIcon from '../components/AccountIcon';
import PostListRenderer from '../components/PostListRenderer';
import LocationService from '../common/LocationService';
import View_Post from './View_Post';
import LinearGradient from 'react-native-linear-gradient';

const Home = ({ navigation }: { navigation: any }) => {
  // const [hasLocationPermission, setHasLocationPermission] = useState<boolean | null>(null);
  // const checkLocationPermission = async () => {
  //   try {
  //     const instance = await LocationService.CreateAndInitialize();
  //     setHasLocationPermission(instance.hasPermission);
  //   } catch (error) {
  //     console.error('Error checking location permission:', error);
  //     setHasLocationPermission(false); // Assume no permission in case of an error
  //   }
  // };

  return (
    <LinearGradient
      style={globalscreenstyles.container}
      colors={[
        global.background,
        global.post_color.expiry_mid[0],
        global.background,
      ]}
      start={{ x: 0, y: 0 }}>
      <TabBar
        LeftIcon={<Logo LogoSize={15}></Logo>}
        RightIcon={<MessageIcon></MessageIcon>}></TabBar>

      <View style={globalscreenstyles.body}>
        <PostListRenderer isHeaderInNeed={true} navigation={navigation} />
      </View>

      <TabBar
        LeftIcon={<HomeIcon></HomeIcon>}
        MiddleIcon={<CreateAdIcon></CreateAdIcon>}
        RightIcon={<AccountIcon></AccountIcon>}></TabBar>
    </LinearGradient>
  );
};

export default Home;
