import React, { useContext, useEffect, useState } from 'react';
import { View, Dimensions } from 'react-native';
import globalscreenstyles from '../common/global_ScreenStyles';
import { global } from '../common/global_styles';
import Logo from '../components/Logo';
import CreateAdIcon from '../components/CreateAdIcon';
import MessageIcon from '../components/MessageIcon';
import HomeIcon from '../components/HomeIcon';
import AccountIcon from '../components/AccountIcon';
import PostListRenderer from '../components/PostListRenderer';
import LinearGradient from 'react-native-linear-gradient';
import TabBarTop from '../components/TabBarTop';
import TabBarBottom from '../components/TabBarBottom';
import { adEndpoint } from '../common/API';
import { djangoConfig } from '../common/NetworkRequest';
import axios from 'axios';
import {
  getLocationPermissionAndroid,
  getLocation,
} from '../common/LocationServices';
import { useGlobal } from '../common/GlobalContext';
import generatePostListStyles from '../styles/postListStyles';

import { Title } from 'react-native-paper';

import SelectRangeBar from '../components/SelectRangeBar';
import Icon from '../components/Icon';

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
  const screenWidth = Dimensions.get('window').width;
  const postListStyles = generatePostListStyles(screenWidth);
  const { firstLaunch, locationPermission, updateLocationPermission } =
    useGlobal();
  const [whichHeader, setWhichHeader] = useState('');
  const [whichEndpoint, setWhichEndpoint] = useState('all');

  useEffect(() => {
    const fuckMe = async () => {
      console.log(locationPermission);
      if (locationPermission === 'GRANTED') {
        setWhichHeader('location-enabled');
      } else {
        setWhichHeader('location-disabled');
      }
    };
    fuckMe();
  }, []);

  useEffect(() => {
    const awaitLocation = async () => {
      const pos = await getLocation();
      // trigger component refresh
      setWhichEndpoint('location');
      fetchAds(2, pos);
    };

    // retrieve longitude and latituce if accessing location is permitted
    if (locationPermission === 'GRANTED') {
      console.log(locationPermission);
      awaitLocation();
    }
  }, [locationPermission]);

  // think this one through. This might require some brain power here

  // bassiically wehn the app is launched, and location services aare ena
  async function fetchAds(pageNumber: number, location?: any) {
    if (location) {
      console.log(location);
      console.log('we will need to form our strike here');
    } else {
      const payload = await getAllAds(pageNumber);
      return payload;
    }
  }

  async function getAllAds(pageNumber: number) {
    const adEndpointWithPage = `${adEndpoint}?page=${pageNumber}`;
    const payload = await axios.get(adEndpointWithPage, djangoConfig());
    return payload.data;
  }

  async function getAdsLocation(pageNumber: number, location: any) {}

  const enableLocation = async () => {
    // make asynchronous location call
    let answer = await getLocationPermissionAndroid();
    // only perform location services if user enables them
    if (answer) {
      // change header
      setWhichHeader('location-enabled');
      // update state
      updateLocationPermission('GRANTED');
    }
  };

  const disableLocation = async () => {
    // make asynchonronous normal call
    setWhichHeader('location-disabled');
    // update state
    updateLocationPermission('DENIED');
  };

  const renderHeader_Handler = (): React.ReactNode => {
    switch (whichHeader) {
      case 'location-disabled': {
        return renderHeader_Default();
      }
      case 'location-enabled': {
        return renderHeader_Location();
      }
    }
  };

  /**
   * @function
   * @description
   * Renders the header for the home screen, displaying a title and a `SelectRangeBar`.
   */
  // @Todo consider making this a component

  const renderHeader_Location = (): React.ReactNode => {
    const disableLocationIcon = '../assets/location.png';
    return (
      <View style={postListStyles.listHeder}>
        <View style={postListStyles.dropdownHeader}>
          <SelectRangeBar onSelectRange={handleSelectRange} />
          <Icon
            source={require(disableLocationIcon)}
            size={50}
            onPress={disableLocation}></Icon>
        </View>
        <View style={postListStyles.titleContainer}>
          <Title style={postListStyles.title} testID="header title">
            Showing Posts Nearby
          </Title>
        </View>
      </View>
    );
  };

  // @Todo consider making this a component
  const renderHeader_Default = (): React.ReactNode => {
    const enableLocationIcon = '../assets/location-zero.png';
    return (
      <View style={postListStyles.listHeder}>
        <View style={postListStyles.dropdownHeader}>
          <Icon
            source={require(enableLocationIcon)}
            size={50}
            onPress={enableLocation}></Icon>
        </View>
        <View style={postListStyles.titleContainer}>
          <Title style={postListStyles.title} testID="header title">
            Showing All Posts
          </Title>
        </View>
      </View>
    );
  };

  /**
   * @function
   * @description
   * Updates the `range` state when a new range is selected.
   *
   * @param {number} selectedRange - The selected range value.
   */
  const handleSelectRange = (selectedRange: string) => {
    setRange(selectedRange);
    console.log(selectedRange);
  };

  return (
    <View style={globalscreenstyles.container}>
      {/* <LinearGradient
        style={globalscreenstyles.container}
        colors={[global.background, global.purple, global.background]}
        start={{ x: 0, y: 0 }}> */}
      <TabBarTop
        LeftIcon={<Logo size={55}></Logo>}
        RightIcon={<MessageIcon></MessageIcon>}></TabBarTop>
      <View style={globalscreenstyles.middle}>
        <PostListRenderer
          key={whichEndpoint}
          whichHeader={renderHeader_Handler()}
          endpoint={adEndpoint}
          navigation={navigation}
          getData={fetchAds}
        />
      </View>

      <TabBarBottom
        LeftIcon={<HomeIcon></HomeIcon>}
        MiddleIcon={<CreateAdIcon></CreateAdIcon>}
        RightIcon={<AccountIcon></AccountIcon>}></TabBarBottom>
      {/* </LinearGradient> */}
    </View>
  );
};

export default Home;
