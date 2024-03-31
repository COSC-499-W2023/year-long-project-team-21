import React, { useState } from 'react';
import Texts from '../components/Text';
import { Text } from 'react-native';
import styles from '../styles/loginStyle';
import { djangoConfig } from '../common/NetworkRequest';
import LinearGradient from 'react-native-linear-gradient';
import Title from '../components/Title';
import InputField from '../components/InputField';
import Button from '../components/Button';
import { global } from '../common/global_styles';
import Icon from '../components/Icon';
import GoBackIcon from '../components/GoBackIcon';
import TabBarTop from '../components/TabBarTop';
import { passReset } from '../common/API';
import axios from 'axios';

const ForgotPassword = ({ navigation }: { navigation: any }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [email, setEmail] = useState('');

  const funnyEmailErrorMessages = [
    "That doesn't look like an email address we've ever seen!",
    "Are you sure that's an email address? It looks a bit...unusual.",
    'Oops! That email has too much personality.',
    'Is that an email address or a mysterious code?',
    'Our email validator just fainted. Try a different one?',
    "Looks like someone's keyboard had a mind of its own.",
    "Even pigeons wouldn't deliver to that email!",
  ];

  const validator = require('validator');

  const handleEmail = (input: string) => {
    setEmail(input);
  };

  const verifyEmail = () => {
    const randomIndex = Math.floor(
      Math.random() * funnyEmailErrorMessages.length,
    );
    setErrorMessage(funnyEmailErrorMessages[randomIndex]);
  };

  const handleNetworkError = (error: any) => {
    if (axios.isAxiosError(error) && error.response) {
      const responseData = error.response.data;
      const key = Object.keys(responseData)[0];
      setErrorMessage(responseData[key][0]);
      return error.response.status;
    } else {
      // Handle errors that aren't related to Axios' responses
      setErrorMessage(`An unexpected error occurred: ${error}`);
      return undefined;
    }
  };

  const apiCall = async () => {
    // now that I think about it, state is global variables. And global variables are just kind of... gross
    try {
      const body = { email };
      const payload = await axios.post(passReset, body, djangoConfig());
      return payload;
    } catch (error) {
      return handleNetworkError(error);
    }
  };

  const handleButtonOnPress = async () => {
    // Display an email message if the email is not, well, an email
    if (!validator.isEmail(email)) {
      verifyEmail();
    } else {
      // else, reset error any existing error message, and try calling the backend. Any error the backend generates will populate the error field. Knarly
      setErrorMessage('');
      let payload: any = await apiCall();
      if (payload.status == 200) {
        console.log('oh my god');
      }
    }
  };

  return (
    <>
      <TabBarTop LeftIcon={<GoBackIcon></GoBackIcon>}></TabBarTop>
      <LinearGradient
        style={styles.LoginContainer}
        colors={[global.purple, global.background]}
        start={{ x: 1, y: 0 }}>
        <Icon
          source={require('../assets/logo-with-name.png')}
          size={200}></Icon>
        <Title
          title="Forgot Your Password"
          titleSize={30}
          testID="loginTitle"
        />

        <Texts
          textsColor="white"
          texts="We get it, mistakes can happen. Please enter the email address associated with your account and we will send you a password reset link."
          textsSize={14}
        />

        <InputField
          placeholder="Enter Email Address"
          onChangeText={input => handleEmail(input)}
          value={email}
          width={280}
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
          title="Request Reset Link"
          onPress={() => handleButtonOnPress()}
          testID="loginButton"
          buttonSize={250}
          textSize={15}
        />
      </LinearGradient>
    </>
  );
};

export default ForgotPassword;
