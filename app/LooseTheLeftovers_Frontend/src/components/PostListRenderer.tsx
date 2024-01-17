import React, { useState, useEffect, useRef } from 'react';
import { View, Text, FlatList } from 'react-native';
import Post from '../components/Post'; // Replace with the correct path to your Post component
import postData from '../assets/fake_post_data.json';
import { PostProps } from '../common/Types';
import postListStyles from '../styles/postListStyles';
const PostListRenderer = () => {
  const [posts, setPosts] = useState<PostProps[]>([]);

  useEffect(() => {
    // Fetch posts data from the backend API
    const fetchData = async () => {
      try {
        // Replace 'your-backend-api-endpoint' with the actual endpoint
        // const response = await fetch('your-backend-api-endpoint');
        // const data = await response.json();
        setPosts([]);
        setPosts(postData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once when the component mounts


  const renderPostItem = ({ item }: { item: PostProps }) => {
    console.log('loading...')
    console.log('Rendering item:', item.id); // Log the item being rendered
  
    return (
      <View style={postListStyles.postContainer}>
        <Post
          id={item.id}
          title={item.title}
          image={item.image}
          expiryDate={item.expiryDate}
          // Pass other necessary props
        />
      </View>
    );
  };

  return (
    <View style={postListStyles.container}>
      <FlatList
        initialNumToRender={1} 
        windowSize={2} 
        removeClippedSubviews={true}
        data={posts}
        keyExtractor={(item) => item.id.toString()} // Replace 'id' with your post identifier
        renderItem={renderPostItem}
      />
      </View>
  );
};

export default PostListRenderer;

