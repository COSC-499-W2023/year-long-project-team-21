import React from 'react';
import { render } from '@testing-library/react-native';
import Logo from '../../src/components/Logo';

describe('Logo component', () => {
  test('renders each part of the logo', () => {
    const { getByTestId } = render(<Logo />);

    // Assert each part of the logo text is rendered
    expect(getByTestId('HomeIconTest')).toBeDefined();
  });
});
