import React from 'react';
import { Text, View } from 'react-native';
import { SecureAPIReq } from '../common/NetworkRequest';
import globalscreenstyles from '../common/global_ScreenStyles';
import { global } from '../common/global_styles';
import Conversation_EndedStyles from '../styles/conversation_EndedStyles';
import Button from '../components/Button';

const Conversation_Ended = ({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) => {
  const { ad_id, user_id } = route.params;

  console.log(user_id);
  const handleNoOnPress = () => {
    navigation.navigate('Reviews', { user_id });
  };
  const handleYesOnPress = async () => {
    const newReq: any = await SecureAPIReq.createInstance();

    const endpoint = '/ads/';
    const deleteInfo = {
      ad_id: ad_id,
    };

    try {
      await newReq.delete(endpoint, deleteInfo);
      console.log('ad is succesfully deleted');
    } catch (error) {
      console.error('there was an error in deleting post', error);
    }
    navigation.navigate('Reviews', { user_id });
  };

  return (
    <View style={globalscreenstyles.container}>
      <Text style={Conversation_EndedStyles.Title}>
        Was the food succesfully delivered?
      </Text>

      <View style={Conversation_EndedStyles.Button}>
        <Button onPress={handleYesOnPress} title="Yes" />
        <Button
          backgroundcolor={global.post_color.expiry_short[1]}
          onPress={handleNoOnPress}
          title="No"
        />
      </View>
    </View>
  );
};

export default Conversation_Ended;
