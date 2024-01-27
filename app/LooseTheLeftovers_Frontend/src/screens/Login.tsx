import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import styles from '../styles/loginStyle';
import { loginReq } from '../common/NetworkRequest';
import {
  removeUserSession,
  storeUserSession,
} from '../common/EncryptedSession';

import Logo from '../components/Logo';
import Title from '../components/Title';
import InputField from '../components/InputField';
import Text from '../components/Text';
import Button from '../components/Button';

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
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegistrationNavigation = () => {
    navigation.navigate('Registration');
  };

  const handleButtonOnPress = async () => {
    if (validateInputs()) {
      try {
        await loginReq(username, password);
        console.log('testing console');
        navigation.navigate('Home');
      } catch (error) {
        setErrorMessage(
          `${error instanceof Error ? error.message : String(error)}`,
        );
        //console.log(errorMessage);
      }
    }
  };

  // Set error message accordingly
  const validateInputs = () => {
    if (username === '' && password === '') {
      setErrorMessage('Please fill in credentials');
      return false;
    }
    if (username === '') {
      setErrorMessage('Please fill in the username');
      return false;
    }
    if (password === '') {
      setErrorMessage('Please fill in the password');
      return false;
    }
    setErrorMessage(''); // Clear any existing error messages
    return true; // Inputs are valid
  };

  // Handle input text from the InputFields for username and password.
  // Update their respective states and clear any existing error messages.
  const handleUsername = (input: string) => {
    setUsername(input);
    setErrorMessage(''); // Clear the error message when the user starts typing again
  };

  const handlePassword = (input: string) => {
    setPassword(input);
    setErrorMessage(''); // Clear the error message when the user starts typing again
  };

  return (
    <>
      <SafeAreaView style={styles.LoginContainer}>
        <Logo LogoSize={40} />
        <Title title="Login" titleSize={30} testID="loginTitle" />
        <InputField
          placeholder="Username"
          onChangeText={input => handleUsername(input)}
          value={username}
          width={280}
        />
        <InputField
          placeholder="Password"
          onChangeText={input => handlePassword(input)}
          value={password}
          secureTextEntry={true}
          width={280}
        />
        {/* Conditionally render the error message */}
        {errorMessage !== '' && (
          <Text
            texts={errorMessage} // Pass error message
            textsSize={14}
            textsColor="red"
            testID="error-msg"
          />
        )}
        <Button
          title="Login"
          onPress={() => handleButtonOnPress()}
          testID="loginButton"
        />
        <Text texts="Forgot password?" textsSize={18} />
        <Text
          texts="Sign Up"
          textsSize={18}
          onPress={() => handleRegistrationNavigation()}
          position="top"
        />
      </SafeAreaView>
    </>
  );
};

export default Login;
