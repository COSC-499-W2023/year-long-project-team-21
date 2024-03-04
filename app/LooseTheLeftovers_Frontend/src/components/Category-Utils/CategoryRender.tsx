import React, { useState } from 'react';
import { View } from 'react-native';
import Category from './Category';
import categoryStyles from '../../styles/categoryStyles';
import { CategoryRenderProps } from '../../common/Types';

/** CategoryRender component.
* @component
* @param {CategoryInfo[]} props.CategoryInfo -an array for the infromation about the category(name,imagesource,size)
* @param { (categoryName: string, isSelected: boolean) => void} props.onCategoryPress -call back funtion when an icon is pressed. Will pass the name and if it's selected
* @example
*  <CategoryRender
          onCategoryPress={function-to-handle-onceits-pressed}
          categoryInfo={JSON-containing-categoryinfo}></CategoryRender>
*/

const CategoryRender: React.FC<CategoryRenderProps> = ({
  selectedCategories: propSelectedCategories,
  categoryInfo,
  onCategoryPress,
}) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    propSelectedCategories,
  );

  //toggles selection
  const toggleCategorySelection = (categoryName: string) => {
    setSelectedCategories(prev => {
      const isSelected = prev.includes(categoryName);
      //checks if the category name is selcected by filtering out the name
      if (isSelected) {
        return prev.filter(name => name !== categoryName);
      } else {
        return [...prev, categoryName];
      }
    });
  };
  //this uses category component and the .map to print out all the components. Then the color of the icon
  //and the output is printed out on PostListRender
  return (
    <View testID={'CategoryRenderTestID'} style={categoryStyles.categoryWhole}>
      {categoryInfo.map((category, index) => (
        <Category
          key={index}
          isSelected={selectedCategories.includes(category.name)}
          onPress={() => {
            const categoryName = category.name;
            const isSelected = selectedCategories.includes(categoryName);
            toggleCategorySelection(categoryName);
            onCategoryPress(categoryName, !isSelected);
          }}
          size={category.size}
          categoryName={category.name}
          imageSource={category.imageSource}
        />
      ))}
    </View>
  );
};

export default CategoryRender;
