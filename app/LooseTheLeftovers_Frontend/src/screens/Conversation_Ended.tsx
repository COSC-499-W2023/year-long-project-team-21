import React, { useState } from 'react';
import { Text, View } from 'react-native';
import globalscreenstyles from '../common/global_ScreenStyles';
import ReviewStyles from '../styles/ReviewStyles';

import Button from '../components/Button';

const Conversation_Ended = ({ navigation }: { navigation: any }) => {
  const handleButtonOnPress = async () => {};

  return (
    <View style={globalscreenstyles.container}>
      {/* <Text style={ReviewStyles.Title}>
        How would you rate this interaction?
      </Text>
      <View style={ReviewStyles.Rating}> </View>
      <View style={ReviewStyles.Button}>
        <Button onPress={handleButtonOnPress} title="Done" />
      </View> */}
    </View>
  );
};

export default Conversation_Ended;
