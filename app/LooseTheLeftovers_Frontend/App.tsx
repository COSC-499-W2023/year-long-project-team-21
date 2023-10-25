import { View, Text, SafeAreaView, StyleSheet } from "react-native"
// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack"; 
import Login from './src/pages/Login'
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App = () => {
  return(
   <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name = "login" component={Login}/>
    </Stack.Navigator>
   </NavigationContainer>  
  )
}

export const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
})
export default App;