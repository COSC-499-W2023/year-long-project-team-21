import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Registration from '../screens/Registration';
import Login from '../screens/Login';
import Instruction from '../screens/Instruction';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
       <Stack.Screen
        name="Registration"
        component={Registration}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Instruction" component={Instruction} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
