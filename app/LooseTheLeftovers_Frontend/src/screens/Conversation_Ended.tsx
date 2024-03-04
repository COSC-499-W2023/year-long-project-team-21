import React, { useState } from 'react';
import { Text, View } from 'react-native';
import globalscreenstyles from '../common/global_ScreenStyles';
import ReviewStyles from '../styles/ReviewStyles';
import Conversation_EndedStyles from '../styles/conversation_EndedStyles';
import { global } from '../common/global_styles';

import Button from '../components/Button';

const Conversation_Ended = ({ navigation }: { navigation: any }) => {
  const handleButtonOnPress = () => {
    navigation.navigate('Reviews');
  };

  return (
    <View style={globalscreenstyles.container}>
      <Text style={Conversation_EndedStyles.Title}>
        Was the food succesfully delivered?
      </Text>

      <View style={Conversation_EndedStyles.Button}>
        <Button onPress={handleButtonOnPress} title="Yes" />
        <Button
          backgroundcolor={global.post_color.expiry_short[1]}
          onPress={handleButtonOnPress}
          title="No"
        />
      </View>
    </View>
  );
};

export default Conversation_Ended;
