import React, { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
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
import Categories from '../components/CategoryUtils/Category';

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

  async function fetchAds(pageNumber: number) {
    const adEndpointWithPage = `${adEndpoint}?page=${pageNumber}`;
    const payload = await axios.get(adEndpointWithPage, djangoConfig());
    return payload.data;
  }

  const categoryInfo = [
    {
      name: '',
      imageSource: '',
      size: { width: 0, height: 0 },
    },
    {
      name: '',
      imageSource: '',
      size: { width: 0, height: 0 },
    },
    {
      name: '',
      imageSource: '',
      size: { width: 0, height: 0 },
    },
  ];

  // const categoryList = () => {
  //   return instructions.map(element => {
  //     return (
  //       <TextImage
  //         key={element.id}
  //         text={element.txt}
  //         source={element.image}
  //         size={element.size}
  //       />
  //     );
  //   });
  // };

  return (
    <View style={globalscreenstyles.container}>
      <TabBarTop
        LeftIcon={<Logo size={55}></Logo>}
        RightIcon={<MessageIcon></MessageIcon>}></TabBarTop>

      <Categories></Categories>

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
    </View>
  );
};

export default Home;
