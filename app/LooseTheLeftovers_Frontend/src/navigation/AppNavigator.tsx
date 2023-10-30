import React from 'react';
import Login from '../screens/Login';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Instruction from '../screens/Instruction';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="Instruction" component={Instruction} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
