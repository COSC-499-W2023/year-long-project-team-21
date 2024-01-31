import React, { useState, useEffect, memo, useCallback } from 'react';
import { View, FlatList, Dimensions, Text } from 'react-native';
import Post from '../components/Post'; // Replace with the correct path to your Post component
// import postData from '../assets/fake_post_data.json';
import { PostProps } from '../common/Types';
import SelectRangeBar from './SelectRangeBar';
import { Title } from 'react-native-paper';
import generatePostListStyles from '../styles/postListStyles';
import { PostListRendererProps } from '../common/Types';
import { BASE_URL } from '../common/API';
import { djangoConfig } from '../common/NetworkRequest';
import axios from 'axios';

let stopFetchMore = true;

const PostListRenderer: React.FC<PostListRendererProps> = ({
  isHeaderInNeed,
  // locationPermission,
  navigation,
  endpoint,
}) => {
  const screenWidth = Dimensions.get('window').width;
  const postListStyles = generatePostListStyles(screenWidth);
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [range, setRange] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [lastItemIndex, setLastItemIndex] = useState(0); // Initialize with 0
  useEffect(() => {
    console.log('loading...');
    fetchData(0);
  }, [!stopFetchMore]);

  /**
   * Makes an asynchronous request to the backend API based on location permission.
   * @async
   * @function
   * @throws {Error} Throws an error if there is an issue fetching the data.
   */

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
        title: post.title,
        image: BASE_URL + post.image,
        expiryDate: post.expiry,
        category: post.category,
        color: post.color,
      };
    });

    return filteredPosts;
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
  const fetchData = async (startIndex: number) => {
    try {
      //const data = server(lastItemIndex);
      // Update lastItemIndex with the new value

      // not sure the point of setPosts
      setPosts([]);

      // send API call to the backend
      const response = await axios.get(endpoint, djangoConfig());
      // properly index data for filterData
      const adData: [] = response.data;
      // unsure why we need this tbh.
      const filteredPosts = filterData(adData);
      // not sure the point of this
      // setLastItemIndex(lastItemIndex + filteredPosts.length);

      // I think this sets the post
      setPosts(prevPosts => [...prevPosts, ...filteredPosts]);
      // no longer loading
      setIsLoading(false);
      // boolean flag for stopping lazy loading
      stopFetchMore = true;
    } catch (error) {
      console.error('Error fetching data:', error);
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
  const renderPostItem = useCallback(
    ({ item }: { item: PostProps }) => {
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
    },
    [navigation],
  );

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
  const renderHeader_Profile = () => {
    return null;
  };

  /**
   * @function
   * @description
   * Renders a loading indicator as a footer while data is being fetched.
   */
  const ListFooterComponent = () => (
    <Text style={postListStyles.footer}>Loading...</Text>
  );

  /**
   * @function
   * @description
   * Triggered when the end of the list is reached, loading more data by incrementing the `pagecurrent` state.
   */
  const handleLoadMore = async () => {
    /*
    setIsLoading(true);
    if (!stopFetchMore) {
      console.log('Loading more data...');
      await fetchData(lastItemIndex);
      stopFetchMore = true;
    }
    setIsLoading(false);*/
  };

  const keyExtractor = useCallback(
    (item: { id: { toString: () => any } }) => item.id.toString(),
    [],
  );

  return (
    <FlatList
      testID="flatlist"
      initialNumToRender={3}
      maxToRenderPerBatch={5}
      windowSize={2}
      removeClippedSubviews={true}
      ListFooterComponent={ListFooterComponent}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      data={posts}
      keyExtractor={keyExtractor} // Replace 'id' with your post identifier
      renderItem={renderPostItem}
      ListHeaderComponent={
        isHeaderInNeed ? renderHeader_Home : renderHeader_Profile
      }
      onScrollBeginDrag={() => {
        stopFetchMore = false;
      }}
    />
  );
};

export default memo(PostListRenderer);
