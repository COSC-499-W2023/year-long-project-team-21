import React, { useState, useEffect, memo, useCallback } from 'react';
import { View, FlatList, Text, Dimensions } from 'react-native';
import { PostListRendererProps, PostProps } from '../common/Types';
import { Title } from 'react-native-paper';
import SelectRangeBar from './SelectRangeBar';
import generatePostListStyles from '../styles/postListStyles';
import Post from './Post';
import { BASE_URL } from '../common/API';
import { useFocusEffect } from '@react-navigation/native';
import globalscreenstyles from '../common/global_ScreenStyles';
import profileStyles from '../styles/profileStyles';
import UserInfo from '../components/UserInfo';
import Button from './Button';

const PostListRenderer: React.FC<PostListRendererProps> = ({
  isHeaderInNeed,
  endpoint,
  getData,
  // locationPermission,
  navigation,
  userInfo,
  handleEditOnpress,
  handleLoginOnpress,
}) => {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [range, setRange] = useState('');
  const screenWidth = Dimensions.get('window').width;
  const postListStyles = generatePostListStyles(screenWidth);
  const [currentPage, setCurrentPage] = useState(1);
  const [fetchAllowed, setFetchAllowed] = useState(true);
  const [loadedAllAds, setLoadedAllAds] = useState(false);

  // Function to fetch data when the screen gains focus
  const fetchDataOnFocus = () => {
    setFetchAllowed(true); // Allow fetching data again
    setLoadedAllAds(false);
  };

  // Use useFocusEffect to fetch data when the screen gains focus, aka when the user came back to the screen where post list is rendered.
  useFocusEffect(
    useCallback(() => {
      fetchDataOnFocus();
    }, []),
  );

  /*
   * useEffect hook listens for changes in fetchAllowed. Initial component render sets fetchAllowed to true, enabling fetchData to call the backend API for 3 ads to render.
   * After rendering items, fetchData sets fetchAllowed to false. Once user scrolls to the bottom of the page, fetchAllowed is set to true, which calls the backend again.
   * Potential performance gains here by only listening if fetchAllowed is true
   */
  useEffect(() => {
    if (fetchAllowed) fetchData(currentPage);
  }, [fetchAllowed]);

  /**
   * Filters and transforms raw data into a specific format.
   * @function
   * @param {any[]} data - The raw data to be filtered.
   * @returns {Object[]} The filtered and transformed data.
   * @Todo replace the base URL here and make it come from ./api
   */
  const filterData = (data: any[]) => {
    const filteredPosts = data.map(post => {
      return {
        id: post.id,
        endpoint: post.endpoint,
        title: post.title,
        image: BASE_URL + post.image,
        expiryDate: post.expiry,
        category: post.category,
        color: post.color,
      };
    });

    return filteredPosts;
  };

  const filterExistingData = (data: any[]) => {
    return data.filter(
      (newPost: { id: number }) =>
        !posts.some(existingPost => existingPost.id === newPost.id),
    );
  };

  /**
   * @function
   * @description
   * Fetches post data from the backend API based on locationPermission.
   *
   * @async
   * @methodOf PostListRenderer
   *
   * @throws {Error} Throws an error if there is an issue fetching the data.
   */
  const fetchData = async (page: number) => {
    try {
      const payload = await getData(page);
      const response = payload.status;
      if (response == 200) {
        let data = filterData(payload.data);
        data = filterExistingData(data);
        setPosts(prevData => [...prevData, ...data]);
        setCurrentPage(currentPage + 1);
      } else if (response == 204) {
        setLoadedAllAds(true);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setFetchAllowed(false);
    }
  };

  /**
   * @function
   * @description
   * Renders an individual post item using the `Post` component.
   *
   * @param {Object} params - Parameters for rendering the post item.
   * @param {PostProps} params.item - The post item to be rendered.
   */
  const renderPostItem = ({ item }: { item: PostProps }) => {
    return (
      <View style={postListStyles.postContainer}>
        <Post
          id={item.id}
          endpoint={endpoint}
          title={item.title}
          image={item.image}
          expiryDate={item.expiryDate}
          category={item.category}
          color={item.color}
          navigation={navigation}
        />
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

  /**
   * @function
   * @description
   * Renders the header for the home screen, displaying a title and a `SelectRangeBar`.
   */
  const renderHeader_Home = React.memo(() => {
    return (
      <View style={postListStyles.listHeder}>
        <View style={postListStyles.dropdownHeader}>
          <SelectRangeBar onSelectRange={handleSelectRange} />
        </View>
        <View style={postListStyles.titleContainer}>
          <Title style={postListStyles.title} testID="header title">
            Showing Posts Nearby
          </Title>
        </View>
      </View>
    );
  });

  /**
   * @function
   * @description
   * Renders the header for the profile screen. (Currently set to null)
   */
  const renderHeader_Profile = React.memo(() => {
    return (
      <View style={profileStyles.userinfocontainer}>
        <UserInfo userInfo={userInfo!} userInfoKeys={['username', 'email']} />
        <View style={profileStyles.button_container}>
          <View>
            <Button
              backgroundcolor="red"
              buttonSize={150}
              onPress={handleLoginOnpress!}
              title="Logout"></Button>
          </View>
          <View>
            <Button
              buttonSize={150}
              onPress={handleEditOnpress!}
              title="Edit"></Button>
          </View>
        </View>
      </View>
    );
  });

  /**
   * @function
   * @description
   * Renders a loading indicator as a footer while data is being fetched.
   */
  const ListFooterComponent = () =>
    loadedAllAds ? (
      <Text style={postListStyles.footer}></Text>
    ) : (
      <Text style={postListStyles.footer}>Loading...</Text>
    );

  const keyExtractor = useCallback(
    (item: PostProps, index: number) => `${item.id}_${index}`,
    [],
  );

  return (
    <FlatList
      testID="flatlist"
      initialNumToRender={4}
      maxToRenderPerBatch={3}
      windowSize={2}
      removeClippedSubviews={true}
      ListFooterComponent={ListFooterComponent}
      onEndReached={() => {
        console.log('End reached');
        setFetchAllowed(true);
      }}
      onEndReachedThreshold={0.3}
      data={posts}
      keyExtractor={keyExtractor}
      renderItem={renderPostItem}
      ListHeaderComponent={
        isHeaderInNeed ? renderHeader_Home : renderHeader_Profile
      }
      onScrollBeginDrag={() => {
        setFetchAllowed(false);
      }}
    />
  );
};

export default memo(PostListRenderer);
