import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';



const App = () => {
  return (
    
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
 
  );
};

export default App;
