import React from 'react';
import Login from '../screens/Login';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Instruction from '../screens/Instruction';
import Registration from '../screens/Registration';
const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Registration"
        component={Registration}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Instruction" component={Instruction} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
