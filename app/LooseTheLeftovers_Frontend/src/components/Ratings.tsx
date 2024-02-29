import React from 'react';
import { View } from 'react-native';
import { global } from '../common/global_styles';
import { RatingProps } from '../common/Types';
import { Rating } from 'react-native-ratings';
/**
 * @Documentation
 * This is a desciption of ratings. This component has two uses. For adding a rating after completing
 * an interaction with another user and for showing what the average users ratings are.
 * There are 3 important functions that make this possible readonly, startingvalue, and onfinish.
 *
 * If you were to have a user add a rating you would make @readonly false so that the ratings are
 * touchable.If you were want to show the ratings without touchablity then you would make it true.
 *
 * @startingValue is specifically important for showing the average ratings. This is how
 * would set the value that the user would see.
 *
 * @OnfinishRating is important for sending the value to the backend, however it should
 * only act as temporary storage for the value. The
 * rating itself should only be sent once the done button is pressed. This way the user can modify the
 * ratings more then once if they so choose to.
 */

/**
 * Rating component.
 *
 * * @component
 *
 * @param {TextsProps} props - The props for the Rating component.
 * @param {string} props.backgroundColor -determines color of the background
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
  startingValue = 5,
  imageSize = 20,
  showRating = false,
  readonly = false,
  onFinishRating,
}) => {
  return (
    <View testID="RatingTestID">
      <Rating
        fractions={2}
        ratingCount={5}
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
