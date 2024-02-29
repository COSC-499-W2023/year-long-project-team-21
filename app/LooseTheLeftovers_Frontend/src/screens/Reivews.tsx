import React, { useState } from 'react';
import { Text, View } from 'react-native';
import globalscreenstyles from '../common/global_ScreenStyles';
import ReviewStyles from '../styles/ReviewStyles';
import Ratings from '../components/Ratings';
import Button from '../components/Button';

import { SecureAPIReq } from '../../src/common/NetworkRequest';

const Reviews = ({ navigation }: { navigation: any }) => {
  const [rating, setRating] = useState<number>(0);

  const handleButtonOnPress = async () => {
    try {
      const newReq: any = await SecureAPIReq.createInstance();
      const endpoint = '/ratings/';
      const ratingInfo = {
        ratings: rating,
        receiver_id: 'n3c777',
      };
      setRating(0);

      const res = await newReq.post(endpoint, ratingInfo);

      // Log the response to the console
      console.log('API Response:', res);

      navigation.navigate('Login');
    } catch (error: any) {
      console.log('Error:', error);
    }
  };

  const handleOnFinishRating = (newRating: number) => {
    setRating(newRating);
  };

  return (
    <View style={globalscreenstyles.container}>
      <Text style={ReviewStyles.Title}>
        How would you rate this interaction?
      </Text>
      <View style={ReviewStyles.Rating}>
        <Ratings
          readonly={false}
          onFinishRating={handleOnFinishRating}
          startingValue={0}
          imageSize={60}
        />
      </View>
      <View style={ReviewStyles.Button}>
        <Button onPress={handleButtonOnPress} title="Done" />
      </View>
    </View>
  );
};

export default Reviews;
