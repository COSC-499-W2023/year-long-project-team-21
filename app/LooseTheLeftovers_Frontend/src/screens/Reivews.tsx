import React from 'react';
import { Text, View } from 'react-native';
import Texts from '../components/Text';
import globalscreenstyles from '../common/global_ScreenStyles';
import { global } from '../common/global_styles';
import ReviewStyles from '../styles/ReviewStyles';
import Rating from '../components/Rating';
import Button from '../components/Button';

const Reviews = ({ navigation }: { navigation: any }) => {
  const handleButtonOnPress = () => {
    navigation.navigate('Home');
  };
  return (
    <View style={globalscreenstyles.container}>
      <Text style={ReviewStyles.Title}>
        How would you rate this interaction?
      </Text>
      <View style={ReviewStyles.Rating}>
        <Rating size={50}></Rating>
      </View>
      <View style={ReviewStyles.Button}>
        <Button onPress={handleButtonOnPress} title="Done"></Button>
      </View>
    </View>
  );
};

export default Reviews;
