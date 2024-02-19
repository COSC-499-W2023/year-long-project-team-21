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
  onCategoryPress: (categoryName: string) => void;
}

const CategoryRender: React.FC<CategoryRenderProps> = ({
  categoryInfo,
  onCategoryPress,
}) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const toggleCategorySelection = (categoryName: string) => {
    const isSelected = selectedCategories.includes(categoryName);

    if (isSelected) {
      // If already selected, remove from the selected list
      setSelectedCategories(prev => prev.filter(name => name !== categoryName));
    } else {
      // If not selected, add to the selected list
      setSelectedCategories(prev => [...prev, categoryName]);
    }
  };

  return (
    <View style={categoryStyles.categoryWhole}>
      {categoryInfo.map((category, index) => (
        <Category
          key={index}
          isSelected={selectedCategories.includes(category.name)}
          onPress={() => {
            toggleCategorySelection(category.name);
            onCategoryPress(category.name);
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
