import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const MyTheme = {
 ...DefaultTheme,
 colors: {
  ...DefaultTheme.colors,
  background: 'white'
 }
}

const App = () => {
  return (
    
      <NavigationContainer  theme={MyTheme} >
        <AppNavigator />
      </NavigationContainer>
 
  );
};

export default App;
