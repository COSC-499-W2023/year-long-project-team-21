import React, { useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import styles from '../styles/loginStyle';
import { handleAxiosError, djangoConfig } from '../common/NetworkRequest';
import {
  removeUserSession,
  storeUserSession,
} from '../common/EncryptedSession';

import Logo from '../components/Logo';
import Title from '../components/Title';
import InputField from '../components/InputField';
import Text from '../components/Text';
import Button from '../components/Button';
import Texts from '../components/Text';

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

  // async function handling login. Stores authentication token in encrypted storage
  async function loginReq(user: string, pass: string) {
    // login URL (need to remove hard-coding)
    const endpoint: string = 'users/tokens/';
    try {
      // Create axios POST request, incoming username and password in the body
      const response = await axios.post(
        endpoint,
        {
          username: user,
          password: pass,
        },
        djangoConfig(),
      );
      // Parse the response and assign to respective variables
      const accessToken: string = response.data['access'];
      const refreshToken: string = response.data['refresh'];
      // Clear any existing user session before storing the new one
      await removeUserSession();
      // Store the new user session
      await storeUserSession(accessToken, refreshToken);
    } catch (error) {
      // generate custom error
      handleAxiosError(error, {
        401: 'Invalid username or password',
      });
    }
  }

  const handleRegistrationNavigation = () => {
    navigation.navigate('Registration');
  };

  const handleButtonOnPress = async () => {
    if (validateInputs()) {
      try {
        await loginReq(username, password);
        navigation.navigate('Instruction');
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
        />
        <InputField
          placeholder="Password"
          onChangeText={input => handlePassword(input)}
          value={password}
          secureTextEntry={true}
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
        <Texts
          texts="Sign Up"
          textsSize={18}
          onPress={() => handleRegistrationNavigation()}
        />
      </SafeAreaView>
    </>
  );
};

export default Login;
