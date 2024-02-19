import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { global } from '../../common/global_styles';
import { ImageSourcePropType } from 'react-native';
import categoryStyles from '../../styles/categoryStyles';

interface CategoryProps {
  size?: number;
  categoryName: string;
  imageSource: ImageSourcePropType;
  onPress: () => void;
  isSelected: boolean;
  testID: string;
}

const Category: React.FC<CategoryProps> = ({
  isSelected,
  size,
  imageSource,
  onPress,
  testID,
}) => {
  const category = {
    width: size,
    height: size,
  };
  const backgroundColor = isSelected ? global.primary : global.tertiary;

  return (
    <TouchableOpacity
      testID={'categoryTestID'}
      onPress={onPress}
      style={[categoryStyles.container, { backgroundColor }]}>
      <Image source={imageSource} style={category} />
    </TouchableOpacity>
  );
};

export default Category;
