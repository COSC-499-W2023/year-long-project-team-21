import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Slider from '@react-native-community/slider';
import { global } from '../common/global_styles';
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

const styles = StyleSheet.create({
  slider: {
    width: '100%', // Take full width of the content container
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%', // Match the width of the slider
    marginTop: 10, // Add space between the slider and the labels
  },
  sliderLabel: {
    color: global.primary,
  },
});

export default ExpirySlider;
