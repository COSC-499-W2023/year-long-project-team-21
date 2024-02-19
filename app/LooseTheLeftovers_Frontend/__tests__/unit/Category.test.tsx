// import Category from '../../src/components/Category-Utils/Category';
// import React from 'react';
// import { render } from '@testing-library/react-native';
// import '@testing-library/jest-native/extend-expect';
// import { global } from '../../src/common/global_styles';
// import fireEvent from '@testing-library/react-native';
// import CategoryRender from '../../src/components/Category-Utils/CategoryRender';
// import { press } from '@testing-library/react-native/build/user-event/press';
// import handleCategoryPress from '../../src/screens/Home';

// describe('CategoryRender', () => {
//   it('logs the correct messages when category is pressed', () => {
//     const categoryInfo = [
//       {
//         name: 'Category1',
//         imageSource: require('path/to/image1.png'),
//         size: 24,
//       },
//       {
//         name: 'Category2',
//         imageSource: require('path/to/image2.png'),
//         size: 24,
//       },
//       // Add more category info as needed
//     ];

//     const { getByTestId } = render(
//       <CategoryRender
//         testID="categoryrenderTestID"
//         onCategoryPress={handleCategoryPress}
//         categoryInfo={categoryInfo}
//       />,
//     );

    // Get the category element and simulate a press event
    const categoryContainer = getByTestId('categoryrenderTestID');
    const categoryElement = categoryContainer.children[0]; // Adjust the index as needed
    fireEvent.press(categoryElement);

    // Check if the correct console log message is called
    expect(console.log).toHaveBeenCalledWith(
      'Category',
      'Category1',
      'has been selected.',
    );
  });
});

// describe('Category Component', () => {
//   test('renders correctly when selected', () => {
//     const { getByTestId } = render(
//       <Category
//         testID="categoryTestID"
//         isSelected={true}
//         onPress={() => {}}
//         categoryName="testCategory"
//         imageSource={require('../../src/assets/gluten-free.png')}
//       />,
//     );

//     const categoryIcon = getByTestId('categoryTestID');
//     fireEvent.press(categoryIcon);
//   });

//   test('renders correctly when not selected', () => {
//     const { getByTestId } = render(
//       <Category
//         testID="categoryTestID"
//         isSelected={false}
//         onPress={() => {}}
//         categoryName="testCategory"
//         imageSource={require('../../src/assets/gluten-free.png')}
//       />,
//     );

//     const categoryContainer = getByTestId('categoryTestID');
//     expect(categoryContainer).toHaveStyle({ backgroundColor: global.tertiary });
//   });

// describe('CategoryRender Component', () => {
//   test('renders correctly with categoryInfo', () => {
//     const categoryInfo = [
//       {
//         name: 'test1',
//         imageSource: require('../../src/assets/gluten-free.png'),
//         size: 50,
//       },
//       {
//         name: 'test2',
//         imageSource: require('../../src/assets/gluten-free.png'),
//         size: 50,
//       },
//     ];

//     const { getByTestId } = render(
//       <CategoryRender
//         testID="category-render-container3"
//         categoryInfo={categoryInfo}
//         onCategoryPress={() => {}}
//       />,
//     );

//     const categoryWhole = getByTestId('category-render-container3');
//     expect(categoryWhole.children.length).toBe(categoryInfo.length);
//   });
// });
