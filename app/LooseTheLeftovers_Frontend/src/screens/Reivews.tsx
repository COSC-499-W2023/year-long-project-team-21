import React from 'react';
import { Text, View } from 'react-native';
import globalscreenstyles from '../common/global_ScreenStyles';
import ReviewStyles from '../styles/ReviewStyles';
import Ratings from '../components/Ratings';
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
        <Ratings startingValue={0} imageSize={60}></Ratings>
      </View>
      <View style={ReviewStyles.Button}>
        <Button onPress={handleButtonOnPress} title="Done"></Button>
      </View>
    </View>
  );
};

export default Reviews;
