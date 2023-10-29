import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
interface TitleProps {
  title: string;
}

const Title: React.FC<TitleProps> = ({title}) => {
  return (
    <View>
      <Text style={styles.textTitle}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  textTitle: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    paddingRight: 20,
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default Title;
