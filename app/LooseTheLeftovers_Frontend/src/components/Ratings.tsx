import React from 'react';
import { View } from 'react-native';
import { global } from '../common/global_styles';
import { AirbnbRating } from 'react-native-ratings';

interface RatingProps {
  defaultSelectedColor?: string;
  defaultUnselectedColor?: string;
  count?: number;
  defaultRating?: number;
  size?: number;
  showRating?: boolean;
}

const Rating: React.FC<RatingProps> = ({
  defaultSelectedColor = global.yellow,
  defaultUnselectedColor = global.background,
  count = 5,
  defaultRating = 2,
  size = 20,
  showRating = false,
}) => {
  return (
    <View>
      <AirbnbRating
        selectedColor={defaultSelectedColor}
        unSelectedColor={defaultUnselectedColor}
        isDisabled={false}
        count={count}
        defaultRating={defaultRating}
        size={size}
        showRating={showRating}
      />
    </View>
  );
};

export default Rating;
