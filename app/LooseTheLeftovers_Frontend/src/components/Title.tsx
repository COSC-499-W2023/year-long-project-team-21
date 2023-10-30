import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
interface TitleProps {
  title: string;
}

const Title: React.FC<TitleProps> = ({ title }) => {
  return (
    <View style={styles.TitleContainer}>
      <Text>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  TitleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 25,
  },
});

export default Title;
