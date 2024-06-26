import React, { useState, useEffect } from 'react';
import Texts from '../components/Text';
import { Text } from 'react-native';
import styles from '../styles/loginStyle';
import { loginReq } from '../common/NetworkRequest';
import LinearGradient from 'react-native-linear-gradient';
import Title from '../components/Title';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { global } from '../common/global_styles';
import Icon from '../components/Icon';
import { useGlobal } from '../common/GlobalContext';
import { useChat } from '../common/ChatContext';

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
const Login = ({ navigation, route }: { navigation: any; route: any }) => {
  const { firstLaunch } = useGlobal();
  const { updateLoggedIn } = useChat();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  //this forces a Re-render of the page:
  const [key, setKey] = useState(Math.random());

  //this resets values after the page is focused.
  useEffect(() => {
    setUsername('');
    setPassword('');
    setErrorMessage('');
    setKey(Math.random());

    return () => {};
  }, []);

  const handleRegisterNav = () => {
    navigation.navigate('Registration');
  };

  const handleButtonOnPress = async () => {
    if (validateInputs()) {
      try {
        await loginReq(username, password);
        if (firstLaunch) {
          navigation.navigate('Instruction');
          updateLoggedIn(true);
        } else {
          navigation.navigate('Home');
          updateLoggedIn(true);
        }
      } catch (error) {
        setErrorMessage(
          `${error instanceof Error ? error.message : String(error)}`,
        );
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

  const handleForgotPassword = () => {
    navigation.navigate('Forgot_Password');
  };

  return (
    <>
      <LinearGradient
        //the key forces the re-render
        key={key}
        style={styles.LoginContainer}
        colors={[global.purple, global.background]}
        start={{ x: 1, y: 0 }}>
        <Icon
          source={require('../assets/logo-with-name.png')}
          size={200}></Icon>
        <Title title="Login" titleSize={30} testID="loginTitle" />
        <InputField
          placeholder="Username"
          onChangeText={input => handleUsername(input)}
          value={username}
          width={280}
          maxLength={20}
        />
        <InputField
          placeholder="Password"
          onChangeText={input => handlePassword(input)}
          value={password}
          secureTextEntry={true}
          width={280}
          maxLength={25}
        />
        {/* Conditionally render the error message */}
        {errorMessage !== '' && (
          <Texts
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

        <Texts
          position="top"
          textsColor="white"
          texts="Forgot password?"
          textsSize={14}
          onPress={() => handleForgotPassword()}
        />
        <Text style={{ marginTop: 30 }}>
          <Texts
            texts="Not a member?"
            textsColor="white"
            textsSize={18}
            onPress={() => handleRegisterNav()}
          />
          <Texts
            texts=" Sign Up"
            textsSize={18}
            onPress={() => handleRegisterNav()}
          />
        </Text>
      </LinearGradient>
    </>
  );
};

export default Login;
