import Logo from '../src/components/Logo';
import React from 'react';

import { render } from '@testing-library/react-native';

describe('Title component', () => {
  test('test Title component: render properly with provided tile', () => {
    //set title

    const logoTitle = 'LosetheLeftovers';

    //render Title component
    const { getByText } = render(<Logo />);

    //Assert
    const titleElement = getByText(logoTitle);
    expect(titleElement).toBeDefined();
  });
});
