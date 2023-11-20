import { render, screen } from '@testing-library/react-native';
import TextImage from '../src/components/TextImage';
import React = require('react');
describe('TextImage component', () => {
  it('renders correctly with provided image', () => {
    //set
    const image = '../src/assets/banana.png';

    //render
    const title_test = 'TextImage-image';

    const { getByTestId } = render(
      <TextImage
        testID="TextImage-image"
        text={title_test}
        source={require(image)}
      />,
    );
    const TxtImage = screen.getByTestId('TextImage-image');

    //Assert
    const titleElement = getByTestId(title_test);
    expect(titleElement).toBeDefined();

    //Assert
    expect(TxtImage).toBeDefined();
  });
});
