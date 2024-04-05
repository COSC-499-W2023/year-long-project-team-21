import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { navigationRef } from './src/navigation/NavigationService';
import { ChatProvider } from './src/common/ChatContext';

const LoadingScreenColor = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#2e2e2e',
  },
};
const App = () => {
  return (
    <NavigationContainer
      theme={LoadingScreenColor}
      ref={navigationRef}
      data-testid="navigation-container">
      <ChatProvider>
        <AppNavigator />
      </ChatProvider>
    </NavigationContainer>
  );
};

export default App;
