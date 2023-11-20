import React from 'react';
import { render } from '@testing-library/react-native';
import Logo from '../src/components/Logo';

describe('Logo component', () => {
  test('renders each part of the logo', () => {
    const { getByText } = render(<Logo />);

    // Assert each part of the logo text is rendered
    expect(getByText('Lose')).toBeDefined();
    expect(getByText('the')).toBeDefined();
    expect(getByText('Leftovers')).toBeDefined();
  });
});
