import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { navigationRef } from './src/navigation/NavigationService';

const App = () => {
  return (
    <NavigationContainer ref={navigationRef} >
      <AppNavigator />
    </NavigationContainer>
  );
};

export default App;
