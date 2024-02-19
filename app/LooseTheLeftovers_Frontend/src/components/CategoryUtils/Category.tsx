import React from 'react';
import { Image, Text, View } from 'react-native';
import { global } from '../../common/global_styles';
import categoryBackground from '../../styles/categoryStyles';

interface CategoriesProps {
  size?: number;
  categoryName: string;
  imageSource: string;
}

const Category: React.FC<CategoriesProps> = ({
  size,
  categoryName,
  imageSource,
}) => {
  const categoryStyle = {
    width: 50 || size,
    height: 50 || size,
    backgroundColor: global.tertiary,
  };
  return (
    <View style={categoryBackground.container}>
      <Image
        source={require(imageSource)}
        style={[{ width: size, height: size }]}
      />
    </View>
  );
};
export default Category;
