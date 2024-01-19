import React, { useState, useEffect, useRef } from 'react';
import { View, FlatList, Dimensions } from 'react-native';
import Post from '../components/Post'; // Replace with the correct path to your Post component
import postData from '../assets/fake_post_data.json';
import { PostProps } from '../common/Types';
import LocationService from '../common/LocationService';
import SelectRangeBar from './SelectRangeBar';
import { Title } from 'react-native-paper';
import generatePostListStyles from '../styles/postListStyles';
import { PostListRendererProps } from '../common/Types';
const PostListRenderer: React.FC<PostListRendererProps> = ({
  isHeaderInNeed
}) => {
  const screenWidth = Dimensions.get('window').width;
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [hasLocationPermission, setHasLocationPermission] = useState<
    boolean | null
  >(null);
  const postListStyles = generatePostListStyles(screenWidth);
  useEffect(() => {
    const checkLocationPermission = async () => {
      try {
        const instance = await LocationService.CreateAndInitialize();
        setHasLocationPermission(instance.hasPermission);
      } catch (error) {
        console.error('Error checking location permission:', error);
        setHasLocationPermission(false); // Assume no permission in case of an error
      }
    };

    checkLocationPermission();
  }, []);

  useEffect(() => {
    // Fetch posts data from the backend API
    const fetchData = async () => {
      try {
        // Replace 'your-backend-api-endpoint' with the actual endpoint
        // const response = await fetch('your-backend-api-endpoint');
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
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  const renderPostItem = ({ item }: { item: PostProps }) => {
    console.log('loading...');
    console.log('Rendering item:', item.id); // Log the item being rendered

    return (
      <View style={postListStyles.postContainer}>
        <Post
          id={item.id}
          title={item.title}
          image={item.image}
          expiryDate={item.expiryDate}
          category={item.category}
        
          // Pass other necessary props
        />
      </View>
    );
  };

  const handleSelectRange = (selectedRange: number) => {
    console.log('selected: ', selectedRange);
  };

  const renderRangeBar = () => {
    return (
      <View style={postListStyles.listHeder}>
        <View style={postListStyles.titleHeader}>
          <Title>Showing Posts Nearby</Title>
        </View>
        <View style={postListStyles.dropdownHeader}>
          <SelectRangeBar onSelectRange={handleSelectRange} />
        </View>
      </View>
    );
  };

  return (
    <FlatList
      initialNumToRender={2}
      maxToRenderPerBatch={5}
      windowSize={1}
      removeClippedSubviews={true}
      data={posts}
      keyExtractor={item => item.id.toString()} // Replace 'id' with your post identifier
      renderItem={renderPostItem}
      ListHeaderComponent={isHeaderInNeed ? renderRangeBar : null}
    />
  );
};

export default PostListRenderer;
