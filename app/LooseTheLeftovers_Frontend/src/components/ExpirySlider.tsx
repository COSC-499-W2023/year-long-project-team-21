import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Slider from '@react-native-community/slider';
import { global } from '../common/global_styles';
import styles from '../styles/expirySliderStyles';
import { type ExpirySliderProps } from '../common/Types';

/**
 * ExpirySlider component.
 *
 * A slider component for selecting an expiry range for an item. The slider allows users
 * to choose a value between 1 day and 2 weeks.
 *
 * @component
 * @example
 * return (
 *   <ExpirySlider />
 * )
 */
const ExpirySlider: React.FC<ExpirySliderProps> = ({ onExpiryChange }) => {
  const [sliderValue, setSliderValue] = useState(1);

  const handleValueChange = (value: number) => {
    setSliderValue(value);
    onExpiryChange(value);
  };

  return (
    <>
      <Text style={styles.currentValueText}>
        {`${sliderValue} day${sliderValue > 1 ? 's' : ''}`}
      </Text>
      <Slider
        style={styles.slider}
        minimumValue={1}
        maximumValue={14}
        step={1}
        value={sliderValue}
        onValueChange={handleValueChange}
        minimumTrackTintColor={global.primary}
        maximumTrackTintColor="#d3d3d3"
        thumbTintColor={global.primary}
      />
      <View style={styles.sliderLabels}>
        <Text style={styles.sliderLabel}>1 day</Text>
        <Text style={styles.sliderLabel}>1 week</Text>
        <Text style={styles.sliderLabel}>2 weeks</Text>
      </View>
    </>
  );
};


export default ExpirySlider;
