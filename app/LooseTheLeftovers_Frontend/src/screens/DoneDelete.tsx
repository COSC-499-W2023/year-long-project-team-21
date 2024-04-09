import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../styles/doneStyles';

import Button from '../components/Button';

const DoneScreen = ({ navigation }: { navigation: any }) => {
  return (
    <View style={styles.container}>
      <Icon name="checkmark-circle-sharp" size={200} color="green" />
      <Text style={styles.successText}>Post deleted successfully!</Text>
      <View style={styles.button}>
        <Button title="Done" onPress={() => navigation.navigate('Profile')} />
      </View>
    </View>
  );
};

export default DoneScreen;
