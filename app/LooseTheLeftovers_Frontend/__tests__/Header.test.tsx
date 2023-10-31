import { render, screen } from '@testing-library/react-native';
import Header from '../src/components/Header';
import React = require('react');
describe('Header component', () => {
  it('renders correctly with provided image', () => {
    //set
    const imageUri =
      'https://images.freeimages.com/images/large-previews/a8d/artemis-and-apollo-1407733.jpg';

    //render
    const { getByTestId } = render(<Header image={imageUri} />);
    const headerImage = screen.getByTestId('header-image');

    //assert
    expect(headerImage).toBeDefined();
    expect(headerImage.props.source.uri).toBe(imageUri);
  });
});
