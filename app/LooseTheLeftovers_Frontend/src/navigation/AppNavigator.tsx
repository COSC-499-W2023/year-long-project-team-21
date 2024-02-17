import React, {useEffect, useState} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { checkHasLaunched, getHasLaunched } from '../common/EncryptedSession'; 

import Registration from '../screens/Registration';
import Login from '../screens/Login';
import Instruction from '../screens/Instruction';
import CreateAd from '../screens/CreateAd';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import DoneScreen from '../screens/Done';
import ChatList from '../screens/ChatList';
import View_Post from '../screens/View_Post';
import SplashScreen from '../screens/SplashScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const [firstLaunch, setFirstLaunch] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect hook determining if the app has been launched before. Updates state accordingly. 
  useEffect(() => { 
    const checkLaunch = async () => {
      try{
        // check if the app has been launched before and set state accordingly
        const hasLaunched = await checkHasLaunched();
        console.log(hasLaunched);
        if(hasLaunched){
          setFirstLaunch(false);
        }
        else{
          setFirstLaunch(true);
        }
        // after check, setIsLoading to false to finalize loading screen aftern seconds
        setTimeout(() => {
          setIsLoading(false);
        }, 2500);
      }
      catch(e){
        console.error(e);
      }
    }
    checkLaunch();
  },  []);

  // load a splash screen while checking if has launched before. 
  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
        initialParams={{ firstLaunch: firstLaunch }}
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
        initialParams = {{ firstLaunch: firstLaunch }}
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
