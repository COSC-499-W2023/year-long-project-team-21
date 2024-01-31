import React from 'react';
import { render } from '@testing-library/react-native';
import Title from '../../src/components/Title';

describe('Title component', () => {
  test('test Title component: render properly with provided title id', () => {
    // Set title
    const title_test = 'testing';
    const testID = 'title_test';

    // Render Title component
    const { getByTestId } = render(
      <Title title={title_test} testID={testID} />,
    );

    // Assert
    const titleElement = getByTestId(testID);
    expect(titleElement).toBeDefined();
  });
});
