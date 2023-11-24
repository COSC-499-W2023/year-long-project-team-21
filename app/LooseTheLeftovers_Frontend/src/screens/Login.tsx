
import { Alert, SafeAreaView } from 'react-native';
import React, { ChangeEvent, useState } from 'react';
import axios from 'axios';
import Button from '../components/Button';
import Header from '../components/Header';
import InputField from '../components/InputField';
import styles from '../styles/loginStyle';
import NetworkRequest from '../common/NetworkRequest'


/**
 * Login component.
 *
 * A component for capturing and authenticating user credentials against a backend.
 *
 * @component
 * @returns {React.Node} The rendered component.
 *
 * @example
 * // Usage
 * <Login />
 */
const Login = ({ navigation }: { navigation: any }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  //Checks if the username&password is empty. If not, then we proceed to check the credential to the backend
  const handleButtonOnPress = async () => {
    // later we can preprocess the input type for now, we assume it is string
    if (username === '' || password === '') {
      Alert.alert('Error', 'Please fill in the credentials.');
    } else {
      // create a new network request
      const networkRequest = new NetworkRequest('tokens');
      try {
        // await credential authentication
        await networkRequest.login(username, password);
        // once credentials are authenticated, navigate to instructions
        navigation.navigate('Instruction');
      } catch (error) {
        Alert.alert(
          'Error',
          'An error occurred while trying to retrieve data.',
        );
        console.log(error)
      }
    }
  };
  
  //Set input text from the text box so that we can handle the credential (username)
  const handleUsername = (input: string) => {
    setUsername(input);
  };
  //Set input text from the text box so that we can handle the credential (password)
  const handlePassword = (input: string) => {
    setPassword(input);
  };

  return (
    <SafeAreaView style={styles.LoginContainer}>
      <Header image="" />
      <InputField
        placeholder="Username"
        onChangeText={input => handleUsername(input)}
        value={username}
      />
      <InputField
        placeholder="Password"
        onChangeText={input => handlePassword(input)}
        value={password}
      />
      <Button title="Login" onPress={() => handleButtonOnPress()} />
    </SafeAreaView>
  );
};


export default Login;
