import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
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
import TabBarTop from '../components/TabBarTop';
import TabBarBottom from '../components/TabBarBottom';
import { adEndpoint } from '../common/API';

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

  const getAds: string = adEndpoint;

  return (
    <LinearGradient
      style={globalscreenstyles.container}
      colors={[
        global.background,
        global.post_color.expiry_mid[0],
        global.background,
      ]}
      start={{ x: 0, y: 0 }}>
      <TabBarTop
        LeftIcon={<Logo LogoSize={15}></Logo>}
        RightIcon={<MessageIcon></MessageIcon>}></TabBarTop>

      <View style={globalscreenstyles.middle}>
        <PostListRenderer
          isHeaderInNeed={true}
          endpoint={adEndpoint}
          navigation={navigation}
        />
      </View>

      <TabBarBottom
        LeftIcon={<HomeIcon></HomeIcon>}
        MiddleIcon={<CreateAdIcon></CreateAdIcon>}
        RightIcon={<AccountIcon></AccountIcon>}></TabBarBottom>
    </LinearGradient>
  );
};

export default Home;
