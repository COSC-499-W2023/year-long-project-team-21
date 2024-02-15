import React from 'react';
import { View } from 'react-native';
import { global } from '../common/global_styles';
import { AirbnbRating } from 'react-native-ratings';
import { RatingProps } from '../common/Types';

/**
 * Rating component.
 *
 * * @component
 *
 * @param {TextsProps} props - The props for the Rating component.
 * @param {string} props.selectedColor -determines color of the selected star
 * @param {string} props.unselectedColor -determines the colors of the stars that haven't been selected
 * @param {number} props.count -numbetr of stars
 * @param {number} props.defaultRating -the rating the star is set too initially. This is how you would set each users rating
 * @param {number} props.size -size of rating
 * @param {boolean} props.isDisabled -determines wether the stars are touchable or not
 * @param {void} props.onFinishRating -once stars have been touched the final result ends up here
 * @example
 *  <Rating isDisabled={true} onFinishRating={ratingCompleted}></Rating>
 */
const Rating: React.FC<RatingProps> = ({
  selectedColor = global.yellow,
  unselectedColor = global.secondary,
  count = 5,
  defaultRating = 5,
  size = 20,
  showRating = false,
  isDisabled = false,
  onFinishRating,
}) => {
  return (
    <View>
      <AirbnbRating
        selectedColor={selectedColor}
        unSelectedColor={unselectedColor} //don't mind the error if you see one, this works for whatever reason
        isDisabled={isDisabled}
        count={count}
        defaultRating={defaultRating}
        size={size}
        showRating={showRating}
        onFinishRating={
          (rating: number) => onFinishRating && onFinishRating(rating) //this checks if it's undefined and avoids an error
        }
      />
    </View>
  );
};

export default Rating;
