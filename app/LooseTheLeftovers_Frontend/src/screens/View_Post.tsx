import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  StyleProp,
  Text,
  View,
  ViewStyle,
  ActivityIndicator,
} from 'react-native';
import globalscreenstyles from '../common/global_ScreenStyles';
import { ViewPostProps } from '../common/Types';
import Logo from '../components/Logo';
import { Card, Title } from 'react-native-paper';
import {
  renderPostImage,
  render_Card_Back,
  render_Card_Middle,
  getCardColors,
  render_Icons,
} from '../common/postUtils';
import { global } from '../common/global_styles';
import generateViewPostStyles from '../styles/view_postStyles';
import Button from '../components/Button';
import TabBarTop from '../components/TabBarTop';
import TabBarBottom from '../components/TabBarBottom';
import CreateAdIcon from '../components/CreateAdIcon';
import MessageIcon from '../components/MessageIcon';
import HomeIcon from '../components/HomeIcon';
import AccountIcon from '../components/AccountIcon';
import { djangoConfig } from '../common/NetworkRequest';
import { BASE_URL, adEndpoint } from '../common/API';
import axios from 'axios';

const View_Post = ({ navigation, route }: { navigation: any; route: any }) => {
  // retrieve endpoint and postId from Post.tsx
  const { postId, endpoint } = route.params;
  const post_color = global.post_color.expiry_long;
  console.log(post_color);
  const styles = generateViewPostStyles(getCardColors(post_color));
  const [adData, setAdData] = useState({
    category: '',
    description: '',
    expiry: '',
    title: '',
    image: null,
    color: '',
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchBackend = async () => {
    try {
      const viewAds: string = endpoint + postId + '/';
      const payload: any = await axios.get(viewAds, djangoConfig());
      let data: JSON = payload.data[0];
      return data;
    } catch (e) {
      // display error?
      console.log(e);
      return undefined;
    }
  };

  useEffect(() => {
    const populateState = async () => {
      const data: any = await fetchBackend();
      if (data && data.image) {
        data.image = BASE_URL + data.image;
        setAdData(data);
        setIsLoading(false);
      } else {
        // exit
        console.log('error retrieving payload');
      }
    };
    populateState();
  }, []);

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
        <Card.Content style={styles.front_container}>
          <Title style={styles.title}>{adData.title}</Title>
          <Title style={styles.expiry}>{adData.expiry}</Title>
          <Text style={styles.description}>{adData.description}</Text>
          {render_Icons(
            styles.dietary_icons_wrapper,
            styles.dietary_icons,
            true,
            true,
            true,
          )}
          <View style={styles.message_button}>
            <Button
              title="message"
              onPress={() => {
                console.log('hi');
              }}
              borderRadius={0.05 * Dimensions.get('window').width}
              color={post_color[1]}
              borderColor={post_color[1]}
              textColor={global.secondary}
            />
          </View>
        </Card.Content>
      </Card>
    );
  };

  if (isLoading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View style={globalscreenstyles.container}>
      <TabBarTop RightIcon={<MessageIcon></MessageIcon>}></TabBarTop>
      <View style={globalscreenstyles.body}>
        <View style={styles.image_container}>
          {renderPostImage(styles.image, adData.image, 40)}
        </View>
        <View style={styles.info_container}>
          {render_Card_Back(styles.card_back)}
          {render_Card_Middle(styles.card_middle)}
          {render_Card_Front(styles.card_front)}
        </View>
      </View>
      <TabBarBottom
        LeftIcon={<HomeIcon></HomeIcon>}
        MiddleIcon={<CreateAdIcon></CreateAdIcon>}
        RightIcon={<AccountIcon></AccountIcon>}></TabBarBottom>
    </View>
  );
};

export default View_Post;
