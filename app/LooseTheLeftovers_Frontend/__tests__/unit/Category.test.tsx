import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CategoryRender from '../../src/components/Category-Utils/CategoryRender';
const mockOnCategoryPress = jest.fn();

//test data
const categoryInfo = [
  {
    name: 'gluten-free',
    imageSource: require('../../src/assets/gluten-free.png'),
    size: 40,
  },
];

test.only('CategoryRender component renders correctly', () => {
  const { getByTestId } = render(
    <CategoryRender
      onCategoryPress={mockOnCategoryPress}
      categoryInfo={categoryInfo}
    />,
  );

  const categoryRenderComponent = getByTestId('CategoryRenderTestID');

  // Check if the component is there and is rendered
  expect(categoryRenderComponent).toBeTruthy();
});

test('Category component renders correctly', () => {
  const { getByTestId } = render(
    <CategoryRender
      onCategoryPress={mockOnCategoryPress}
      categoryInfo={categoryInfo}
    />,
  );

  const categoryComponent = getByTestId('CategoryTestID');

  // Check if the component is there and is rendered
  expect(categoryComponent).toBeTruthy();
});

test('pressing category icon calls onCategoryPress with correct parameters', () => {
  const { getByTestId } = render(
    <CategoryRender
      onCategoryPress={mockOnCategoryPress}
      categoryInfo={categoryInfo}
    />,
  );

  const firstCategoryIcon = getByTestId('CategoryTestID');

  // Simulates press of icon
  fireEvent.press(firstCategoryIcon);

  expect(mockOnCategoryPress).toHaveBeenCalled();
});
