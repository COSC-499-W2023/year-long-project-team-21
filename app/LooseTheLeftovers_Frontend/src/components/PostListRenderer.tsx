import React, { useState, useEffect, useRef } from 'react';
import { View, FlatList, Dimensions, Text } from 'react-native';
import Post from '../components/Post'; // Replace with the correct path to your Post component
import postData from '../assets/fake_post_data.json';
import { PostProps } from '../common/Types';
import LocationService from '../common/LocationService';
import SelectRangeBar from './SelectRangeBar';
import { ActivityIndicator, Title } from 'react-native-paper';
import generatePostListStyles from '../styles/postListStyles';
import { PostListRendererProps } from '../common/Types';
const PostListRenderer: React.FC<PostListRendererProps> = ({
  isHeaderInNeed,
  locationPermission,
  navigation
}) => {
  const screenWidth = Dimensions.get('window').width;
  const postListStyles = generatePostListStyles(screenWidth);
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [range, setRange] = useState<number>();
  const [isLoading, setIsLoading] = useState(false);
  const [pagecurrent, setPagecurrent] = useState(1);
  useEffect(() => {
    console.log('loading...');
    console.log('useeffect pagecurrent', pagecurrent);
    fetchData();
  }, [pagecurrent]);

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
  const fetchData = async () => {
    try {
      console.log('fetching data*************************');

      // const apiUrl = locationPermission
      //   ? 'backend-api-endpoint-for-post'
      //   : 'backend-api-endpoint-for-get';

      // const requestBody = locationPermission
      //   ? { range } // Include range data in the POST request body
      //   : null; // No request body for GET request

      // // Make the request based on locationPermission
      // const response = await fetch(apiUrl, {
      //   method: locationPermission ? 'POST' : 'GET',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     // Add other headers if needed
      //   },
      //   body: locationPermission ? JSON.stringify(requestBody) : null,
      // });

      // const data = await response.json();

      setPosts([]);
      const filteredPosts = postData.map(post => ({
        id: post.id,
        title: post.title,
        image: post.image,
        expiryDate: post.expiryDate,
        category: post.category,
      }));

      setPosts(filteredPosts);
      setIsLoading(false);
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
  const renderPostItem = ({ item }: { item: PostProps }) => {
    return (
      <View style={postListStyles.postContainer}>
        <Post
          id={item.id}
          title={item.title}
          image={item.image}
          expiryDate={item.expiryDate}
          category={item.category}
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
  const handleSelectRange = (selectedRange: number) => {
    setRange(selectedRange);
    console.log(selectedRange)
  };

  /**
   * @function
   * @description
   * Renders the header for the home screen, displaying a title and a `SelectRangeBar`.
   */
  const renderHeader_Home = () => {
    return (
      <View style={postListStyles.listHeder}>
        <View style={postListStyles.titleContainer}>
          <Title style={postListStyles.title} testID='header title'>Showing Posts Nearby</Title>
        </View>
        <View style={postListStyles.dropdownHeader}>
          <SelectRangeBar onSelectRange={handleSelectRange} />
        </View>
      </View>
    );
  };

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
  const renderFooter = () => {
    console.log('rendering footer00000000000000000');
    return isLoading ? (
      <View style={postListStyles.loader}>
        <ActivityIndicator size="large" />
      </View>
    ) : null;
  };

  /**
   * @function
   * @description
   * Triggered when the end of the list is reached, loading more data by incrementing the `pagecurrent` state.
   */
  const handleLoadMore = () => {
    console.log('$$$$$$$$$$$$$$$$ loading more $$$$$$$$$$$$$$$');
    setIsLoading(true);
    setPagecurrent(pagecurrent + 1);
    setIsLoading(false);
  };

  return (
    <FlatList
      initialNumToRender={3}
      maxToRenderPerBatch={5}
      windowSize={2}
      removeClippedSubviews={true}
      ListFooterComponent={renderFooter}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      data={posts}
      keyExtractor={item => item.id.toString()} // Replace 'id' with your post identifier
      renderItem={renderPostItem}
      ListHeaderComponent={
        isHeaderInNeed ? renderHeader_Home : renderHeader_Profile
      }
    />
  );
};

export default PostListRenderer;
