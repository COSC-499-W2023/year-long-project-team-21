import React, { useState } from 'react';
import { View } from 'react-native';
import Category from './Category';
import { ImageSourcePropType } from 'react-native';
import categoryStyles from '../../styles/categoryStyles';

interface CategoryInfo {
  name: string;
  imageSource: ImageSourcePropType;
  size: number;
}

interface CategoryRenderProps {
  categoryInfo: CategoryInfo[];
  onCategoryPress: (categoryName: string, isSelected: boolean) => void;
  testID: string;
}

const CategoryRender: React.FC<CategoryRenderProps> = ({
  categoryInfo,
  onCategoryPress,
  testID,
}) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const toggleCategorySelection = (categoryName: string) => {
    const isSelected = selectedCategories.includes(categoryName);

    if (isSelected) {
      setSelectedCategories(prev => prev.filter(name => name !== categoryName));
    } else {
      setSelectedCategories(prev => [...prev, categoryName]);
    }
  };

  return (
    <View style={categoryStyles.categoryWhole}>
      {categoryInfo.map((category, index) => (
        <Category
          testID={'CategoryRenderTestID'}
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
