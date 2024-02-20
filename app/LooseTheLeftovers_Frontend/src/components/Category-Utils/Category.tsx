import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { global } from '../../common/global_styles';
import categoryStyles from '../../styles/categoryStyles';
import { CategoryProps } from '../../common/Types';

/**
 * Category component.
 *
 * @component
 * @param {CategoryProps} props - The props for the Category component.
 * @param {() => void} props.onPress - Callback function to execute when a category icon is pressed.
 * @param {number} props.size - height and width of category icon
 * @param {string} props.imagegSource -the image for the category icon
 * @param {boolean} props.isSelected - a boolean value that determines wether an icon has been selected 
 * @param {string} props.categoryName -the name of the category

 * @example
 *   <Category
          isSelected={selectedCategories.includes(category.name)}
          onPress={() => {onPressFunction()}}
          size={category.size}
          categoryName={category.name}
          imageSource={category.imageSource}
        />
 */

const Category: React.FC<CategoryProps> = ({
  isSelected,
  size,
  imageSource,
  onPress,
}) => {
  const category = {
    width: size,
    height: size,
  };
  //for changing the color of the background of the icon
  const backgroundColor = isSelected ? global.primary : global.tertiary;

  //this passes through the color the image and the on press to be used by category
  return (
    <>
      <TouchableOpacity
        testID="CategoryTestID"
        onPress={onPress}
        style={[categoryStyles.container, { backgroundColor }]}>
        <Image source={imageSource} style={category} />
      </TouchableOpacity>
    </>
  );
};

export default Category;
