import React, { useCallback, useEffect, useState } from 'react';
import { View, Dimensions, Alert } from 'react-native';
import { global } from '../common/global_styles';
import { useIsFocused } from '@react-navigation/native';
import {
  adEndpoint,
  adsLocation,
  adsLocationCategories,
  adCategories,
} from '../common/API';
import { djangoConfig } from '../common/NetworkRequest';
import {
  getLocationPermission,
  openSettings,
  getLocation,
} from '../common/LocationServices';
import { useGlobal } from '../common/GlobalContext';
import { Title } from 'react-native-paper';
import { GetDataFunctionType } from '../common/Types';

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

const Home = ({ navigation }: { navigation: any }) => {
  const screenWidth = Dimensions.get('window').width;
  const postListStyles = generatePostListStyles(screenWidth);

  const { locationPermission, updateLocationPermission } = useGlobal();

  const [getDataFunction, setGetDataFunction] =
    useState<GetDataFunctionType>(null);

  const [range, setRange] = useState('10');
  const [search, setSearch] = useState('');
  const [whichHeader, setWhichHeader] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const isFocused = useIsFocused();

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

  /****************************************************************** USE EFFECT HOOKS AND BACKEND HANDLER ******************************************************************/

  /**
   * @description This useEffect hook is used to trigger the postFetchHandler function whenever there is a change in the
   * locationPermission or range values. The postFetchHandler function encapsulates the logic for fetching posts based on the
   * current state of location permissions and the selected range. By including locationPermission and range in the dependency array,
   * this hook ensures that postFetchHandler is called whenever either of these values changes, allowing the application to respond
   * to changes in user permissions or selected range.
   */
  useEffect(() => {
    postFetchHandler();
  }, [locationPermission, range, selectedCategories, search]);

  useEffect(() => {
    if (isFocused) {
      console.log('hello?');
      postFetchHandler();
    }
  }, [isFocused]);

  /**
   * @function postFetchHandler
   * @description Handles the logic for determining how to fetch posts based on the current location permission, category selection, and range settings.
   * If the location permission is granted and the range is not 'All', it attempts to set the data fetching function to `getAdsLocation`.
   * In case of any error during this process, it falls back to `getAllAds`. If the location permission is not granted or the range is 'All',
   * it defaults to using `getAllAds`. Additionally, this function updates the header state based on the location permission status and ensures that the loading state is set to false.
   */
  function postFetchHandler() {
    // location permissions are enabled and a range is specified
    if (locationPermission === 'GRANTED' && range !== 'All') {
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
    }
    //  location permissions are disabled or a range is set to 'All'
    else if (locationPermission === 'DENIED' || range === 'All') {
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
    }
    setIsLoading(false);
  }

  /****************************************************************** CATEGORY AND SEARCH STATE UPDATING ******************************************************************/

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

  function updateSearch(search: string) {
    setSearch(search);
  }

  /****************************************************************** BACKEND REQUEST LOGIC ******************************************************************/

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
      console.log(payload);
      return payload;
    } catch (error) {
      console.log(`There was an error getting the location ${error} `);
      return [];
    }
  }

  /**
   * @function getCategorizedAds
   * @description Asynchronously retrieves categorized ads by constructing a dynamic endpoint using
   * the provided page number and selected categories. The function appends each category as a query
   * parameter to the endpoint and makes a GET request to fetch the ads. If an error occurs, it logs
   * the error and returns an empty array.
   * @param {number} pageNumber - The page number for the ads to be retrieved, used for pagination.
   * @returns {Promise<Object[]>} A promise that resolves to an array of ad objects if the request is successful,
   *                              or an empty array if an error occurs.
   */
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

  /**
   * @function getCategorizedLocationAds
   * @description Asynchronously retrieves ads based on the user's location and selected categories.
   * The function first obtains the user's location, constructs a request body with the location data,
   * selected categories, and the requested page number, then makes a POST request to retrieve the relevant ads.
   * If an error occurs during this process, an empty array is returned and the error is logged.
   *
   * @param {number} pageNumber - The page number of ads to retrieve, used for pagination.
   * @returns {Promise<Object[]>} A promise that resolves to an array of ad objects if the request is successful,
   *                              or an empty array if an error occurs.
   */
  async function getCategorizedLocationAds(pageNumber: number) {
    try {
      // retrieve users location permission
      const pos = await getLocation();
      // extract longitude and latitude and set it as the body
      const body = {
        latitude: pos.latitude,
        longitude: pos.longitude,
        range: range,
        page: pageNumber,
        categories: selectedCategories.join(', '),
      };
      // call the backend endpoint
      const payload = await axios.post(
        adsLocationCategories,
        body,
        djangoConfig(),
      );
      //return payload;
      return payload;
    } catch (error) {
      console.log(`There was an error getting the location ${error} `);
      return [];
    }
  }

  /****************************************************************** LOCATION HANDLERS ******************************************************************/

  /**
   * @function enableLocation
   * @description Asynchronously requests location permissions from the user. If the user grants permission,
   * the function updates the location permission state to 'GRANTED'. If the user denies permission, it triggers
   * an alert informing the user that location services are required and provides an option to open the app
   * settings or cancel the action. There is a noted bug where permissions can be enabled, but an error still occurs.
   */
  async function enableLocation() {
    // get location permissions
    let answer = await getLocationPermission();
    // only perform location services if user enables them
    if (answer) {
      // update state.
      updateLocationPermission('GRANTED');
    } else {
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

  /****************************************************************** HEADER HANDLERS ******************************************************************/

  /**
   * @function disableLocation
   * @description Updates the state to indicate that location permissions have been denied. This function
   * is typically called to explicitly set the location permission status to 'DENIED' within the application's state management.
   */
  function disableLocation() {
    // update state
    updateLocationPermission('DENIED');
  }

  function categoryHeader(): React.ReactNode {
    return (
      <CategoryRender
        selectedCategories={selectedCategories}
        onCategoryPress={handleCategoryPress}
        categoryInfo={categoryInfo}></CategoryRender>
    );
  }

  /**
   * @function renderHeader_Handler
   * @description Determines and returns the appropriate header component based on the current location
   * state indicated by 'whichHeader'. It switches between a default header, a location-specific header,
   * and includes the category header in each case.
   * - 'location-disabled': Renders the default header along with the category header.
   * - 'location-enabled': Renders a header that likely includes location-related information along with the category header.
   * @returns {React.ReactElement} The React element that corresponds to the selected header components or null
   */
  function renderHeader_Handler(): React.ReactElement | null {
    switch (whichHeader) {
      case 'location-disabled':
        return (
          <>
            {categoryHeader()}
            {renderHeader_Default()}
          </>
        );
      case 'location-enabled':
        return (
          <>
            {categoryHeader()}
            {renderHeader_Location()}
          </>
        );
      default:
        return null;
    }
  }
  /**
   * @function renderHeader_Location
   * @description Renders the header component for the scenario where the location services are enabled. This header includes a location
   * disable icon, a range selection bar, and conditional text that displays based on the selected range. If the range is set to 'All',
   * it shows text indicating all posts are being shown; otherwise, it displays text indicating that posts are being shown nearby.
   * @returns {React.ReactNode} The React component representing the location-enabled header.
   */
  function renderHeader_Location(): React.ReactNode {
    const disableLocationIcon = '../assets/location.png';
    return (
      <View style={postListStyles.listHeder}>
        <View style={postListStyles.dropdownHeader}>
          <Icon
            source={require(disableLocationIcon)}
            size={50}
            onPress={disableLocation}></Icon>
          <SelectRangeBar setRange={setRange} />
        </View>
        {/* If range is equal to 'All', then show "showing all posts" nearby text. If not, then let's show that the post is nearby" */}
        {range === 'All' ? allAdsText() : showingAdsNearby()}
      </View>
    );
  }

  /**
   * @function renderHeader_Default
   * @description Renders the default header component, which includes an icon to enable location services.
   * When the icon is pressed, it triggers the `enableLocation` function. The header also displays a text component
   * indicating that all ads are being shown.
   * @returns {React.ReactNode} The React component representing the default header.
   */
  function renderHeader_Default(): React.ReactNode {
    const enableLocationIcon = '../assets/location-zero.png';
    return (
      <View style={postListStyles.listHeder}>
        <View style={postListStyles.dropdownHeader}>
          <Icon
            source={require(enableLocationIcon)}
            size={50}
            onPress={enableLocation}></Icon>
        </View>
        {allAdsText()}
      </View>
    );
  }

  /**
   * @function allAdsText
   * @description Renders a React component displaying a text message "Showing All Posts". This component is typically
   * used in headers to indicate that all available posts are being displayed, without any filtering or restrictions
   * based on location or other criteria.
   * @returns {React.ReactNode} A React component that displays the "Showing All Posts" message.
   */
  function allAdsText(): React.ReactNode {
    return (
      <View style={postListStyles.titleContainer}>
        <Title style={postListStyles.title} testID="header title">
          Showing All Posts
        </Title>
      </View>
    );
  }

  /**
   * @function showingAdsNearby
   * @description Renders a React component displaying a message indicating that the posts shown are within a
   * certain range. The range is dynamically displayed based on the 'range' state or prop available in the function's scope.
   * This component is typically used in headers to inform users about the geographical filtering applied to the posts being displayed.
   * @returns {React.ReactNode} A React component that displays the message about the range within which posts are being shown.
   */
  function showingAdsNearby(): React.ReactNode {
    return (
      <View style={postListStyles.titleContainer}>
        <Title style={postListStyles.title} testID="header title">
          Showing posts within {range} Km
        </Title>
      </View>
    );
  }

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
          {isLoading ? (
            ''
          ) : (
            <PostListRenderer
              whichHeader={renderHeader_Handler}
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
