import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { navigationRef } from './src/navigation/NavigationService';
import { GlobalProvider } from './src/common/GlobalContext';

const App = () => {
  return (
    <GlobalProvider>
      <NavigationContainer
        ref={navigationRef}
        data-testid="navigation-container">
        <AppNavigator />
      </NavigationContainer>
    </GlobalProvider>
  );
};

export default App;
