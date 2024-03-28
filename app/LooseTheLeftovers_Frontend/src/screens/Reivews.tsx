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
  //this is temporary and it prints out the rating until backend is finsihed.
  const handleOnFinishRating = (rating: number) => {
    console.log('the rating for this user is ', rating);
  };
  return (
    <View style={globalscreenstyles.container}>
      <Text style={ReviewStyles.Title}>
        How would you rate this interaction?
      </Text>
      <View style={ReviewStyles.Rating}>
        {/* starting value doesn't matter too much here what's more important is onFinishRating. 
        Readonly makes it touchable*/}
        <Ratings
          readonly={false}
          onFinishRating={handleOnFinishRating}
          startingValue={0}
          imageSize={60}></Ratings>
      </View>
      <View style={ReviewStyles.Button}>
        <Button onPress={handleButtonOnPress} title="Done"></Button>
      </View>
    </View>
  );
};

export default Reviews;
