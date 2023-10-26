import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import Login from './src/pages/Login';
import Instruction from './src/pages/Instruction';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="Instruction" component={Instruction} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
export default App;
