import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, StyleProp, Text, View, ViewStyle } from 'react-native';
import TabBar from '../components/TabBar';
import globalscreenstyles from '../common/global_ScreenStyles';
import { ViewPostProps } from '../common/Types';
import Logo from '../components/Logo';
import { Card, Title } from 'react-native-paper';
import {
  renderHiddenIcon,
  renderPostImage,
  render_Card_Back,
  render_Card_Middle,
  getCardColors,
  render_Icons
} from '../common/postUtils';
import { global } from '../common/global_styles';
import generateViewPostStyles from '../styles/view_postStyles';
import Button from '../components/Button';
const View_Post: React.FC<ViewPostProps> = ({ route }) => {
  const { postId } = route.params;
  const styles = generateViewPostStyles(getCardColors(global.post_color.expiry_long))
  // useEffect(() => {
  //   // Make a POST request to the backend API
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch('backend-api-endpoint', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           // Add other headers if needed
  //         },
  //         body: JSON.stringify({ id: postId }),
  //       });

  //       const data = await response.json();

  //       // Handle the data as needed
  //       console.log('Fetched data:', data);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData();
  // }, []); // Empty dependency array to run the effect only once

  /**
   * Renders the front part of the post card.
   *
   * @function
   * @private
   * @returns {JSX.Element} The rendered front card component.
   */
  const render_Card_Front = (style: StyleProp<ViewStyle>) => {
    return (
      <Card style={style}>
        <Card.Content style = {styles.front_container} >
          
            <Title style={styles.title}>title</Title>
            <Title style={styles.expiry}>2days</Title>
            <Text style={styles.description}>Fresh salmon fillet grilled to perfection, served with lemon and herbs.</Text>
            {render_Icons(styles.dietary_icons_wrapper,styles.dietary_icons, true, true, true)}
            <View style={styles.message_button}>
            <Button title='message' onPress={()=>{console.log('hi')}}/> 
            </View>
          
        </Card.Content>
      </Card>
    );
  };

  return (
    <View style={globalscreenstyles.container}>
      <TabBar MiddleIcon={<Logo LogoSize={15}></Logo>}></TabBar>

      <View style={globalscreenstyles.body}>
        <View style={styles.image_container}>
          {renderPostImage(styles.image, Dimensions.get('window').width * 0.9)}
        </View>
        <View style={styles.info_container}>
          {render_Card_Back(styles.card_back)}
          {render_Card_Middle(styles.card_middle)}
          {render_Card_Front(styles.card_front)}
        </View>
      </View>
    </View>
  );
};

export default View_Post;
