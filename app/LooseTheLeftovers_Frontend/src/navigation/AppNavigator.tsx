import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Registration from '../screens/Registration';
import Login from '../screens/Login';
import Instruction from '../screens/Instruction';
import Profile from '../screens/Profile';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Registration"
        component={Registration}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Instruction"
        component={Instruction}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
