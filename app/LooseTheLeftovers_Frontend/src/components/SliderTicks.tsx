import React from 'react';
import { View, StyleSheet } from 'react-native';
import { global } from '../common/global_styles';

type TicksProps = {
  steps: number;
};

const Ticks: React.FC<TicksProps> = ({ steps }) => {
  return (
    <View style={styles.ticksContainer}>
      {Array.from({ length: steps }).map((_, index) => (
        <View key={index} style={styles.tick} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
    ticksContainer: {
      position: 'absolute',
      top: 368, // Adjust this value to align with the slider's track
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%', // Set width to match the slider's width
      paddingHorizontal: 20, // Adjust to align with the slider's sides
    },
    tick: {
      width: 1,
      height: 10, // Adjust height as needed to match the slider's track height
      backgroundColor: global.primary, // Use your global.primary color here
    },
    // Other styles...
  });

export default Ticks;
