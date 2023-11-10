import { render, screen } from '@testing-library/react-native';
import Logo from '../src/components/Logo';
import React = require('react');
describe('Logo component', () => {
  it('renders correctly with provided image', () => {
    //set
    const imageUri =
      'https://imgtr.ee/images/2023/11/10/4d692856f331843992a7e74a16f89f69.png';

    //render
    const { getByTestId } = render(<Logo image={imageUri} />);
    const logoImage = screen.getByTestId('Logo-image');

    //assert
    expect(logoImage).toBeDefined();
    expect(logoImage.props.source.uri).toBe(imageUri);
  });
});
