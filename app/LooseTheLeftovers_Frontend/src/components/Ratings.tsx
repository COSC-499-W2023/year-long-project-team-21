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
 * @param {string} props.backgroundColor -determines color of the background
 * @param {number} props.ratingCount -numbetr of stars
 * @param {number} props.startingValue -the rating the star is set too initially. This is how you would set each user's rating
 * @param {number} props.imageSize -size of rating
 * @param {boolean} props.readonly -determines whether the stars are touchable or not
 * @param {void} props.onFinishRating -once stars have been touched the final result ends up here
 * @param {string} [props.testID] - Optional test identifier for the component.
 * @example
 *  <Ratings readonly={true} onFinishRating={ratingCompleted}></Rating>
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
