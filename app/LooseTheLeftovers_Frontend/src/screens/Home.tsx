import React, { useContext, useEffect, useState } from 'react';
import { View, Dimensions, Alert } from 'react-native';
import { global } from '../common/global_styles';
import {
  adEndpoint,
  adsLocation,
  adsLocationCategories,
  adCategories,
} from '../common/API';
import { djangoConfig } from '../common/NetworkRequest';
import {
  getLocationPermissionAndroid,
  openSettings,
  getLocation,
} from '../common/LocationServices';
import { useGlobal } from '../common/GlobalContext';
import { Title } from 'react-native-paper';

import globalscreenstyles from '../common/global_ScreenStyles';
import Logo from '../components/Logo';
import CreateAdIcon from '../components/CreateAdIcon';
import MessageIcon from '../components/MessageIcon';
import HomeIcon from '../components/HomeIcon';
import AccountIcon from '../components/AccountIcon';
import PostListRenderer from '../components/PostListRenderer';
import LinearGradient from 'react-native-linear-gradient';
import TabBarTop from '../components/TabBarTop';
import TabBarBottom from '../components/TabBarBottom';
import axios from 'axios';
import generatePostListStyles from '../styles/postListStyles';
import SelectRangeBar from '../components/SelectRangeBar';
import Icon from '../components/Icon';
import CategoryRender from '../components/Category-Utils/CategoryRender';

// @TODO move this to Types.tsx
type GetDataFunctionType = ((pageNumber: number) => Promise<any>) | null;

const Home = ({ navigation }: { navigation: any }) => {
  // Retrieve screen dimensions to adapt styles dynamically
  const screenWidth = Dimensions.get('window').width;
  const postListStyles = generatePostListStyles(screenWidth);

  // Use global state or context for location permissions
  const { locationPermission, updateLocationPermission } = useGlobal();

  // State management for data fetching and UI rendering
  const [getDataFunction, setGetDataFunction] =
    useState<GetDataFunctionType>(null);
  const [whichHeader, setWhichHeader] = useState('');
  const [range, setRange] = useState('10');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // assets
  const disableLocationIcon = '../assets/location.png';

  const categoryInfo = [
    {
      name: 'gluten-free',
      imageSource: require('../assets/gluten-free.png'),
      size: 35,
    },
    {
      name: 'peanut-free',
      imageSource: require('../assets/nut.png'),
      size: 35,
    },
    {
      name: 'vegan',
      imageSource: require('../assets/vegan.png'),
      size: 35,
    },
  ];

  /**
   * @description This useEffect hook is used to trigger the postFetchHandler function whenever there is a change in the
   * locationPermission or range values. The postFetchHandler function encapsulates the logic for fetching posts based on the
   * current state of location permissions and the selected range. By including locationPermission and range in the dependency array,
   * this hook ensures that postFetchHandler is called whenever either of these values changes, allowing the application to respond
   * to changes in user permissions or selected range.
   */
  useEffect(() => {
    postFetchHandler();
  }, [locationPermission, range, selectedCategories]);

  /****************************************************************** CATEGORY LOGIC ******************************************************************/

  /**
   * @function handleCategoryPress
   * @description Handles the press event on a category item by updating the selected categories state.
   * If the category is selected, its name is added to the state; if deselected, its name is removed.
   * The state update is done immutably to prevent direct mutation of the state.
   *
   * @param {string} categoryName - The name of the category that was pressed.
   * @param {boolean} isSelected - Indicates whether the category is selected (true) or deselected (false).
   */
  function handleCategoryPress(categoryName: string, isSelected: boolean) {
    // Updated state based on the previous state to avoid mutations
    setSelectedCategories(prevCategories => {
      if (isSelected) {
        return [...prevCategories, categoryName];
      } else {
        return prevCategories.filter(category => category !== categoryName);
      }
    });
  }

  /****************************************************************** BACKEND HANDLERS ******************************************************************/

  /**
   * @function postFetchHandler
   * @description Handles the logic for determining how to fetch posts based on the current location permission and range settings.
   * If the location permission is granted and the range is not 'All', it attempts to set the data fetching function to `getAdsLocation`.
   *  In case of any error during this process, it falls back to `getAllAds`. If the location permission is not granted or the range is 'All',
   * it defaults to using `getAllAds`. Additionally, this function updates the header state based on the location permission status and ensures that the loading state is set to false.
   */
  function postFetchHandler() {
    switch (true) {
      // location permissions are enabled and a range is specified
      case locationPermission === 'GRANTED' && range !== 'All':
        // set location-enabled to be the displayed header
        setWhichHeader('location-enabled');
        // retrieve categories nearby
        if (selectedCategories.length > 0) {
          setGetDataFunction(() => getCategorizedLocationAds);
        }
        // retrieve ads nearby
        else {
          setGetDataFunction(() => getAdsLocation);
        }
        break;

      //  location permissions are disabled or a range is set to 'All'
      case locationPermission === 'DENIED' || range === 'All':
        // set correct header based on if location services are granted or not
        locationPermission === 'GRANTED'
          ? setWhichHeader('location-enabled')
          : setWhichHeader('location-disabled');
        // retrieve categories
        if (selectedCategories.length > 0) {
          setGetDataFunction(() => getCategorizedAds);
        }
        // retrieve all ads
        else {
          setGetDataFunction(() => getAllAds);
        }
        break;
    }
    setIsLoading(false);
  }

  /****************************************************************** BACKEND LOGIC ******************************************************************/

  /**
   * @function getAllAds
   * @description Asynchronously retrieves all advertisements from a backend endpoint. This function constructs an endpoint URL with a query parameter for pagination,
   * enabling lazy loading of advertisements by the PostListRenderer component.
   * It logs the current page number and makes a GET request to the constructed endpoint using Axios.
   * The received payload is then returned for use by PostListRenderer.
   *
   * @param {number} pageNumber - The current page number for pagination, used in lazy loading of advertisements.
   * @returns {Promise<Object>} A promise that resolves to the payload containing advertisement data fetched from the backend.
   */
  async function getAllAds(pageNumber: number) {
    try {
      // create endpoint for ads with pageNumber that gets updated by PostListRenderer for lazyloading
      const adEndpointWithPage = `${adEndpoint}?page=${pageNumber}`;
      // call the backend endpoint
      const payload = await axios.get(adEndpointWithPage, djangoConfig());
      // return the data to PostListRenderer
      return payload;
    } catch (error) {
      console.log(`There was an error getting the ads ${error} `);
      return [];
    }
  }

  /**
   * @function getAdsLocation
   * @description Asynchronously retrieves advertisements based on the user's current location. This function fetches the user's location and sends it along with the specified range and page number
   * to the backend endpoint to retrieve location-specific ads. In case of any error during location retrieval or backend communication, it logs the error and returns an empty array.
   *
   * @param {number} pageNumber - The current page number for pagination, used in lazy loading of ads.
   * @returns {Promise<Object[]|[]>} A promise that resolves to the payload of advertisements based on the location, or an empty array in case of an error.
   */
  async function getAdsLocation(pageNumber: number) {
    try {
      // retrieve users location permission
      const pos = await getLocation();
      // extract longitude and latitude and set it as the body
      const body = {
        latitude: pos.latitude,
        longitude: pos.longitude,
        range: range,
        page: pageNumber,
      };
      // call the backend endpoint
      const payload = await axios.post(adsLocation, body, djangoConfig());
      return payload;
    } catch (error) {
      console.log(`There was an error getting the location ${error} `);
      return [];
    }
  }
  // TODO there is a bug where this is called twice?
  async function getCategorizedAds(pageNumber: number) {
    // create and endpoint with a page parameter
    let endpoint = `${adCategories}?page=${pageNumber}`;
    // dynamically add category parameters to afformentioned url depending on amount of categories
    selectedCategories.forEach((category, index) => {
      const key = `key${(index + 1).toString()}`;
      endpoint = `${endpoint}&${key}=${category}`;
    });

    try {
      // make request
      const payload = await axios.get(endpoint, djangoConfig());
      // return response to post-list-renderer
      return payload;
    } catch (error) {
      console.log(`There was an issue retriving categorized ads ${error}`);
      // return a blank response to post list renderer
      return [];
    }
  }

  async function getCategorizedLocationAds(pageNumber: number) {
    console.log('this is categories location');
  }

  async function searchAds(pageNumber: number) {}

  /****************************************************************** LOCATION HANDLERS ******************************************************************/

  async function enableLocation() {
    // get location permissions
    let answer = await getLocationPermissionAndroid();
    // only perform location services if user enables them
    if (answer) {
      // update state.
      updateLocationPermission('GRANTED');
    } else {
      // TODO: bug here. Permissions are enabled but a bug occurs
      Alert.alert(
        'Location Permission Required',
        'You must enable location services to use this feature.',
        [
          {
            text: 'Open settings',
            onPress: () => openSettings(),
          },
          {
            text: 'Cancel',
          },
        ],
      );
    }
  }

  function disableLocation() {
    // update state
    updateLocationPermission('DENIED');
  }

  function renderHeader_Handler(): React.ReactNode {
    switch (whichHeader) {
      case 'location-disabled': {
        return renderHeader_Default();
      }
      case 'location-enabled': {
        return renderHeader_Location();
      }
    }
  }

  const renderHeader_Location = (): React.ReactNode => {
    return (
      <View style={postListStyles.listHeder}>
        <View style={postListStyles.dropdownHeader}>
          <Icon
            source={require(disableLocationIcon)}
            size={50}
            onPress={disableLocation}></Icon>
          <SelectRangeBar setRange={setRange} />
        </View>
        <View style={postListStyles.titleContainer}>
          <Title style={postListStyles.title} testID="header title">
            Showing posts within {range} Km
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

  return (
    <View style={globalscreenstyles.container}>
      <LinearGradient
        style={globalscreenstyles.container}
        colors={[global.background, global.purple, global.background]}
        start={{ x: 0, y: 0 }}>
        <TabBarTop
          LeftIcon={<Logo size={55}></Logo>}
          RightIcon={<MessageIcon></MessageIcon>}></TabBarTop>
        <View style={globalscreenstyles.middle}>
          <CategoryRender
            selectedCategories={selectedCategories}
            onCategoryPress={handleCategoryPress}
            categoryInfo={categoryInfo}></CategoryRender>
          {renderHeader_Handler()}
          {isLoading ? (
            ''
          ) : (
            <PostListRenderer
              endpoint={adEndpoint}
              navigation={navigation}
              getData={getDataFunction}
            />
          )}
        </View>
        <TabBarBottom
          LeftIcon={<HomeIcon></HomeIcon>}
          MiddleIcon={<CreateAdIcon></CreateAdIcon>}
          RightIcon={<AccountIcon></AccountIcon>}></TabBarBottom>
      </LinearGradient>
    </View>
  );
};

export default Home;
