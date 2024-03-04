import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Registration from '../screens/Registration';
import Login from '../screens/Login';
import Instruction from '../screens/Instruction';
import CreateAd from '../screens/CreateAd';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import DoneScreen from '../screens/Done';
import View_Post from '../screens/View_Post';
import ChatList from '../screens/ChatList';
import Reviews from '../screens/Reivews';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Reviews"
        component={Reviews}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Registration"
        component={Registration}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Instruction"
        component={Instruction}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="View_Post"
        component={View_Post}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreateAd"
        component={CreateAd}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Done"
        component={DoneScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChatList"
        component={ChatList}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
