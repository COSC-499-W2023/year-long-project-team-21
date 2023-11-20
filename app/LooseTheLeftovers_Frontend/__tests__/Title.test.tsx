import React from 'react';
import { render } from '@testing-library/react-native';
import Title from '../src/components/Title';

describe('Title component', () => {
  test('test Title component: render properly with provided tile', () => {
    //set title
    const title_test = 'testing';

    //render Title component
    const { getByText } = render(<Title title={title_test} />);

    //Assert
    const titleElement = getByText(title_test);
    expect(titleElement).toBeDefined();
  });
});

