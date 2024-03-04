import React, { useState } from 'react';
import { Text, View } from 'react-native';
import globalscreenstyles from '../common/global_ScreenStyles';
import ReviewStyles from '../styles/ReviewStyles';
import Ratings from '../components/Ratings';
import Button from '../components/Button';
import { retrieveUserSession } from '../common/EncryptedSession';

import { SecureAPIReq } from '../../src/common/NetworkRequest';

const Reviews = ({ navigation }: { navigation: any }) => {
  const [rating, setRating] = useState<number>(0);
  const [isRatingPressed, setIsRatingPressed] = useState<boolean>(false);

  const handleButtonOnPress = async () => {
    try {
      if (!isRatingPressed) {
        console.log('Rating has not been pressed. Review not submitted.');
        navigation.navigate('Home');
        return;
      }

      console.log('new test');
      const newReq: any = await SecureAPIReq.createInstance();
      const userSesh: Record<string, string> = await retrieveUserSession();
      const userId: string = userSesh['user_id'];
      console.log('UserId:', userId);
      const endpoint = '/ratings/';
      const ratingInfo = {
        rating: rating,
        receiver_id: userId,
      };
      setRating(0);
      setIsRatingPressed(false); // Reset the flag after submitting the review
      const res = await newReq.post(endpoint, ratingInfo);
      // Log the response to the console
      console.log('Request Details:', { ratingInfo });
      console.log('API Response:', res);
      navigation.navigate('Home');
    } catch (error) {
      const apiError = error as any;
      // Log the error details
      console.error(
        'API Request Error:',
        apiError.response?.status,
        apiError.response?.data || apiError.message,
      );
    }
  };

  const handleOnFinishRating = (newRating: number) => {
    setRating(newRating);
    setIsRatingPressed(true);
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
