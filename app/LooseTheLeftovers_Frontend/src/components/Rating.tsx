import React from 'react';
import { View } from 'react-native';
import { global } from '../common/global_styles';
import { RatingProps } from '../common/Types';
import { Rating } from 'react-native-ratings';

/**
 * Rating component.
 *
 * * @component
 *
 * @param {TextsProps} props - The props for the Rating component.
 * @param {string} props.selectedColor -determines color of the selected star
 * @param {string} props.unselectedColor -determines the colors of the stars that haven't been selected
 * @param {number} props.count -numbetr of stars
 * @param {number} props.defaultRating -the rating the star is set too initially. This is how you would set each user's rating
 * @param {number} props.imageSize -size of rating
 * @param {boolean} props.isDisabled -determines whether the stars are touchable or not
 * @param {void} props.onFinishRating -once stars have been touched the final result ends up here
 * @param {string} [props.testID] - Optional test identifier for the component.
 * @example
 *  <Rating isDisabled={true} onFinishRating={ratingCompleted}></Rating>
 */
const Ratings: React.FC<RatingProps> = ({
  backgroundColor = global.background,
  ratingCount = 5,
  startingValue = 5,
  imageSize = 20,
  showRating = false,
  readonly = false,
  onFinishRating,
}) => {
  return (
    <View testID="RatingTestID">
      <Rating
        fractions={1}
        ratingCount={ratingCount}
        tintColor={backgroundColor}
        readonly={readonly}
        startingValue={startingValue}
        imageSize={imageSize}
        showRating={showRating}
        onFinishRating={(rating: number) =>
          onFinishRating && onFinishRating(rating)
        }
      />
    </View>
  );
};

export default Ratings;
