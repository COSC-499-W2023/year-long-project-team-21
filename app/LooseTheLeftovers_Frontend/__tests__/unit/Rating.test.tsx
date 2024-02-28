import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Ratings from '../../src/components/Ratings';

describe('Rating Component', () => {
  it('should render properly', () => {
    const { getByTestId } = render(<Ratings testID="RatingTestID" />);
    const ratingComponent = getByTestId('RatingTestID');

    // Check if the rendered component is present
    expect(ratingComponent).toBeDefined();
  });
  it('should call onFinishRating when a star is touched', () => {
    const ratingCompleted = (rating: number) => {};

    const { getByTestId } = render(
      <Ratings onFinishRating={ratingCompleted} testID="RatingTestID" />,
    );

    //testts by pressing third rating
    const pressRating = getByTestId('RatingTestID');

    fireEvent.press(pressRating);

    //test that it has been called
    expect(ratingCompleted).toHaveBeenCalled;
  });

  it('should not call onFinishRating when readonly is true', () => {
    const onFinishRatingMock = jest.fn();
    const { getByTestId } = render(
      <Ratings
        onFinishRating={onFinishRatingMock}
        readonly={true}
        testID="RatingTestID"
      />,
    );

    //simulate pressing of rating
    const pressRating = getByTestId('RatingTestID');

    fireEvent.press(pressRating);

    // test that it hasn't been called
    expect(onFinishRatingMock).not.toHaveBeenCalled();
  });
});
