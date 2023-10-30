import React from 'react';
import Login from '../screens/Login';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="login" component={Login} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
