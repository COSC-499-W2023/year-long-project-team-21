import React from 'react';
import { Text, View } from 'react-native';
import Texts from '../components/Text';
import globalscreenstyles from '../common/global_ScreenStyles';
import { global } from '../common/global_styles';
import ReviewStyles from '../styles/ReviewStyles';
import Ratings from '../components/Rating';
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
      {/* <AirbnbRating></AirbnbRating> */}
    </View>
  );
};

export default Reviews;
