import React, { useState, useEffect, memo, useCallback } from 'react';
import { View, FlatList, Text, Dimensions } from 'react-native';
import { PostListRendererProps, PostProps } from '../common/Types';
import { BASE_URL } from '../common/API';

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
  const [currentPage, setCurrentPage] = useState(1);
  const [fetchAllowed, setFetchAllowed] = useState(true);

  useEffect(() => {
    if (fetchAllowed) fetchData(currentPage);
  }, [fetchAllowed]);

  useEffect(() => {
    // Reset posts and current page when getData changes
    /*
    setPosts([]);
    setCurrentPage(1);
    setFetchAllowed(true);*/
    setPosts([]);
    setCurrentPage(1);
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
    console.log('next page is: ', page);
    try {
      let data = await getData(page);
      data = filterData(data);
      data = filterExistingData(data); //only return non existing posts in post array
      if (data.length > 0) {
        setPosts(prevData => [...prevData, ...data]);
        setCurrentPage(currentPage + 1);
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
   * Renders a loading indicator as a footer while data is being fetched.
   */
  const ListFooterComponent = () => (
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
      onEndReached={() => setFetchAllowed(true)}
      onEndReachedThreshold={0.3}
      data={posts}
      keyExtractor={keyExtractor} // Replace 'id' with your post identifier
      renderItem={renderPostItem}
      ListHeaderComponent={() => {
        return whichHeader ? whichHeader : null;
      }}
      onScrollBeginDrag={() => {
        setFetchAllowed(false);
      }}
    />
  );
};

export default memo(PostListRenderer);
