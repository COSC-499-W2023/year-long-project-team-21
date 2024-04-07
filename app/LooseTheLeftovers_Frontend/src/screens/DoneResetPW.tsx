import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../styles/doneStyles';

import Button from '../components/Button';

const DoneResetPW = ({ navigation }: { navigation: any }) => {
  return (
    <View style={styles.container}>
      <Icon name="checkmark-circle-sharp" size={200} color="green" />
      <Text style={styles.successText}>Password Reset Successfully!</Text>
      <View style={styles.button}>
        <Button title="Done" onPress={() => navigation.navigate('Login')} />
      </View>
    </View>
  );
};

export default DoneResetPW;
