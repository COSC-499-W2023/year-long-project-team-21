import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    fontSize: 40,
  },
  container: {
    position: 'absolute',
    top: 300,
    bottom: 0,
    left: 300,
    right: 0,
    justifyContent: 'flex-end',
  },
  textTitle: {
    textAlign: 'center',
    fontSize: 40,
    fontWeight: 'bold',
    color: 'black',
  },
  belowTitle: {
    textAlign: 'left',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    padding: 20,
  },
});

function Instruction() {
  return (
    <View>
      <View style={[styles.center, {top: 70}]}>
        <Text style={[styles.textTitle]}>Welcome to Lose the leftovers!</Text>
        <Text style={[styles.belowTitle, {top: 80}]}>
          The + button allows you to create an advertisment to share your food
        </Text>
        <Text style={[styles.belowTitle, {top: 90}]}>
          You can see other peoples posts aswell as how long they'll expire in
          wether it's 2 days, or 2 weeks
        </Text>
        <Text style={[styles.belowTitle, {top: 100}]}>
          You can view your account to see your current posts to edit or delete
          them if you like
        </Text>
      </View>
    </View>
  );
}

export default Instruction;
