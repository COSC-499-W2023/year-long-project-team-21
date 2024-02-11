import React, { useContext, useEffect, useState } from 'react';
import {View } from 'react-native';
import globalscreenstyles from '../common/global_ScreenStyles';
import { global } from '../common/global_styles';
import Logo from '../components/Logo';
import CreateAdIcon from '../components/CreateAdIcon';
import MessageIcon from '../components/MessageIcon';
import HomeIcon from '../components/HomeIcon';
import AccountIcon from '../components/AccountIcon';
import PostListRenderer from '../components/PostListRenderer';
import LocationService from '../common/LocationService';
import LinearGradient from 'react-native-linear-gradient';
import TabBarTop from '../components/TabBarTop';
import TabBarBottom from '../components/TabBarBottom';
import { adEndpoint } from '../common/API';
import { djangoConfig } from '../common/NetworkRequest';
import axios from 'axios';

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
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState('');

  async function fetchAds() {
    const payload = await axios.get(adEndpoint, djangoConfig());
    return payload.data;
  }

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
        LeftIcon={<Logo size={55} ></Logo>}
        RightIcon={<MessageIcon></MessageIcon>}></TabBarTop>

      <View style={globalscreenstyles.middle}>
        <PostListRenderer
          isHeaderInNeed={true}
          endpoint={adEndpoint}
          navigation={navigation}
          getData={fetchAds}
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