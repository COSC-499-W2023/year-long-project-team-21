import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Rating from '../../src/components/Rating';

describe('Rating Component', () => {
  it('should render properly', () => {
    const { getByTestId } = render(<Rating testID="RatingTestID" />);
    const ratingComponent = getByTestId('RatingTestID');

    // Check if the rendered component is present
    expect(ratingComponent).toBeDefined();
  });
});

// describe('Rating Component', () => {
//   it('should set default rating correctly', () => {
//     const { getByTestId } = render(
//       <Rating testID="RatingTestID" defaultRating={4} />,
//     );
//     const ratingComponent = getByTestId('RatingTestID');

//     // Check if the default rating is set correctly
//     expect(ratingComponent.props.defaultRating).toBe(4);
//   });

//   it('should call onFinishRating with the correct rating', () => {
//     const onFinishRatingMock = jest.fn();
//     const { getByTestId } = render(
//       <Rating
//         testID="RatingTestID"
//         defaultRating={4}
//         onFinishRating={onFinishRatingMock}
//       />,
//     );
//     const ratingComponent = getByTestId('RatingTestID');

//     // Trigger the onFinishRating event with a specific rating
//     fireEvent(ratingComponent, 'onFinishRating', 3);

//     // Check if onFinishRatingMock was called with the correct rating
//     expect(onFinishRatingMock).toHaveBeenCalledWith(3);
//   });
// });

// import React from 'react';
// import { render } from '@testing-library/react-native';
// import Rating from '../../src/components/Rating';

// describe('Rating component', () => {
//   test('renders correctly with testID', () => {
//     const mockOnFinishRating = jest.fn();

//     const { getByTestId } = render(
//       <Rating
//         testID="RatingTestID"
//         selectedColor="#FFD700"
//         unselectedColor="#808080"
//         count={5}
//         defaultRating={3}
//         size={20}
//         showRating={false}
//         isDisabled={false}
//         onFinishRating={mockOnFinishRating}
//       />,
//     );

//     // Check if the component renders
//     const ratingComponent = getByTestId('RatingTestID');
//     expect(ratingComponent).toBeDefined();

//     // Additional checks if needed
//     // For example, you can check if the onFinishRating prop is correctly passed
//     // and if the colors, size, etc., are set correctly
//   });
// });
