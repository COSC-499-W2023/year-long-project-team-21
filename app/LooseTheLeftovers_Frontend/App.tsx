import React, { useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { setNavigator, navigate } from './src/common/NavigationService';

const App = () => {
  const navigationRef: any = useRef();

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        // Ensure navigation service is set with the current navigator reference
        setNavigator(navigationRef);
      }}>
      <AppNavigator />
    </NavigationContainer>
  );
};

export default App;
