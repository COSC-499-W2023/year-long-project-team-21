import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { navigationRef } from './src/navigation/NavigationService';
import { ChatProvider } from './src/common/ChatContext';

const App = () => {
  return (
    <NavigationContainer ref={navigationRef} data-testid="navigation-container" >
      <ChatProvider>
        <AppNavigator />
      </ChatProvider>
    </NavigationContainer>
  );
};

export default App;
