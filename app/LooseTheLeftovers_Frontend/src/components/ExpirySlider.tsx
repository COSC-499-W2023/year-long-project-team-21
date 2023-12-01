import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Slider from '@react-native-community/slider';
import { global } from '../common/global_styles';

const ExpirySlider = () => {
  const [sliderValue, setSliderValue] = useState(1);

  const handleValueChange = (value: number) => {
    setSliderValue(value);
    console.log('Slider Value:', value);
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
        maximumTrackTintColor='#d3d3d3'
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
