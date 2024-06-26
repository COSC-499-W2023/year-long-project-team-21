import React, { useState, useEffect, memo, useCallback } from 'react';
import { Image, View, FlatList, Text, Dimensions } from 'react-native';
import { PostListRendererProps, PostProps } from '../common/Types';
import { BASE_URL } from '../common/API';
import { useFocusEffect } from '@react-navigation/native';

import generatePostListStyles from '../styles/postListStyles';
import Post from './Post';

const PostListRenderer: React.FC<PostListRendererProps> = ({
  whichHeader,
  endpoint,
  getData,
  navigation,
}) => {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const screenWidth = Dimensions.get('window').width;
  const postListStyles = generatePostListStyles(screenWidth);
  const [fetchAllowed, setFetchAllowed] = useState(true);
  const [loadedAllAds, setLoadedAllAds] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [pageNumber, setPageNumber] = useState(1);

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
   * After rendering items, fetchData sets fetchAllowed to false. Once user scrolls to the bottom of the pageNumber, fetchAllowed is set to true, which calls the backend again.
   * Potential performance gains here by only listening if fetchAllowed is true
   */
  useEffect(() => {
    if (fetchAllowed) fetchData(pageNumber);
  }, [fetchAllowed]);

  useEffect(() => {
    // Reset posts and current pageNumber when getData changes
    setPosts([]);
    setPageNumber(1);
    setFetchAllowed(true);
  }, [getData]);

  /**
   * Filters and transforms raw data into a specific format.
   * @function
   * @param {any[]} data - The raw data to be filtered.
   * @returns {Object[]} The filtered and transformed data.
   * @Todo replace the base URL here and make it come from ./api
   */
  const filterData = (data: any[]) => {
    const filteredPosts = data.map(post => {
      // Construct the object with a conditional distance property
      const postObject = {
        id: post.id,
        endpoint: post.endpoint,
        title: post.title,
        image: BASE_URL + post.image,
        expiryDate: post.expiry,
        category: post.category,
        color: post.color,
        // Conditionally add distance
        ...(post.distance != null && { distance: post.distance }),
      };

      return postObject;
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
  const fetchData = async (pageNumber: number) => {
    try {
      const payload = await getData(pageNumber);
      const response = payload.status;
      // if the response is 200, then we will display the ads, if it is a 204, then let's get rid of the  'loading' indicator.
      if (response == 200) {
        const data = filterData(payload.data);
        const filtered_data = filterExistingData(data);
        setPosts(prevData => [...prevData, ...filtered_data]);
        setPageNumber(pageNumber + 1);
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
          distance={item.distance}
        />
      </View>
    );
  };

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
      ListHeaderComponent={whichHeader ? whichHeader : null}
      ListFooterComponent={ListFooterComponent}
      onEndReached={() => {
        setFetchAllowed(true);
      }}
      onEndReachedThreshold={0.3}
      data={posts}
      keyExtractor={keyExtractor}
      renderItem={renderPostItem}
      onScrollBeginDrag={() => {
        setFetchAllowed(false);
      }}
    />
  );
};

export default memo(PostListRenderer);
