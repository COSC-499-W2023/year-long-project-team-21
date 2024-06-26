import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Registration from '../screens/Registration';
import Login from '../screens/Login';
import ForgotPassword from '../screens/ForgotPassword';
import Instruction from '../screens/Instruction';
import CreateAd from '../screens/CreateAd';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import DoneScreen from '../screens/Done';
import View_Post from '../screens/View_Post';
import SplashScreen from '../screens/SplashScreen';
import ChatList from '../screens/ChatList';
import Reviews from '../screens/Reviews';
import Chat from '../screens/Chat';
import DoneDelete from '../screens/DoneDelete';
import EditProfile from '../screens/EditProfile';
import Conversation_Ended from '../screens/Conversation_Ended';
import DoneEdit from '../screens/DoneEdit';
import DoneResetPW from '../screens/DoneResetPW';
import PasswordReset from '../screens/PasswordReset';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Registration"
        component={Registration}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Forgot_Password"
        component={ForgotPassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PasswordReset"
        component={PasswordReset}
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
        name="Profile"
        component={Profile}
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
        name="DoneDelete"
        component={DoneDelete}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DoneEdit"
        component={DoneEdit}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DoneResetPW"
        component={DoneResetPW}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChatList"
        component={ChatList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Reviews"
        component={Reviews}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Conversation_Ended"
        component={Conversation_Ended}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
