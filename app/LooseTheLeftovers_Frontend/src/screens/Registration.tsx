import React, { useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import styles from '../styles/registrationStyles';
import { global } from '../common/global_styles';
import axios from 'axios';
import * as EmailValidator from 'email-validator';
import { passwordStrength } from 'check-password-strength';
import LinearGradient from 'react-native-linear-gradient';
import Texts from '../components/Text';
import InputField from '../components/InputField';
import Button from '../components/Button';
import Title from '../components/Title';
import Icon from '../components/Icon';
import { useEffect } from 'react';

import { useFocusEffect } from '@react-navigation/native';
/**
 * Registration page
 *
 * A component for capturing and authenticating user credentials against a backend.
 *
 * @component
 * @returns {React.Node} The rendered component.
 *
 * @example
 * // Usage
 * <Registration />
 */
const Registration = ({ navigation }: { navigation: any }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [key, setKey] = useState(Math.random());
  const [passwordsMatchError, setPasswordsMatchError] = useState(false);
  const [usernameLengthError, setUsernameLengthError] = useState(false);
  const [emailFormatError, setEmailFormatError] = useState(false);
  const [serverError, setServerError] = useState(false);
  const [apiRequestErrorMessage, setApiRequestErrorMessage] = useState('');
  const [credentialFilledInError, setCredentialsFilledInError] =
    useState(false);
  const [apiRequestError, setApiRequestError] = useState(false);
  const [passwordStrengthError, setPasswordStrengthError] = useState(false);
  //set input text from the text box so that we can handle credential (Email)
  const handleEmail = (input: string) => {
    setEmail(input);
  };
  //Set input text from the text box so that we can handle the credential (username)
  const handleUsername = (input: string) => {
    setUsername(input);
  };
  //Set input text from the text box so that we can handle the credential (password)
  const handlePassword1 = (input: string) => {
    setPassword1(input);
  };
  //Set input text from the text box so that we can handle the credential (password)
  const handlePassword2 = (input: string) => {
    setPassword2(input);
  };
  const handleLoginNavigation = () => {
    navigation.navigate('Login');
  };
  //Handle password strength check
  const passwordStrengthColor = (
    passwordStrengthId: number,
  ): { color: string } => {
    switch (passwordStrengthId) {
      case 0:
        return { color: global.pass_strength.zero };
      case 1:
        return { color: global.pass_strength.one };
      case 2:
        return { color: global.pass_strength.two };
      case 3:
        return { color: global.pass_strength.three };
      default:
        return { color: global.pass_strength.base };
    }
  };
  //Checks following cases: Any credentials are not provided, password unmatched, password matched&credentials are filled
  const handleButtonOnPress = async () => {
    setCredentialsFilledInError(false);
    setEmailFormatError(false);
    setPasswordsMatchError(false);
    setUsernameLengthError(false);
    setServerError(false);
    setPasswordStrengthError(false);
    setApiRequestError(false);
    if (email == '' || username == '' || password1 == '' || password2 == '') {
      setCredentialsFilledInError(true);
    } else if (password1 !== password2) {
      setPasswordsMatchError(true);
    } else if (!EmailValidator.validate(email)) {
      setEmailFormatError(true);
    } else if (username.length < 6) {
      setUsernameLengthError(true);
    } else if (
      passwordStrength(password1).id !== 3 &&
      passwordStrength(password1).id !== 2
    ) {
      setPasswordStrengthError(true);
    } else {
      setEmailFormatError(false);
      setUsernameLengthError(false);
      setPasswordsMatchError(false);
      setCredentialsFilledInError(false);
      setPasswordStrengthError(false);
      try {
        const apiUrl = 'http://10.0.2.2:8000/users/';

        const response = await axios.post(apiUrl, {
          username: username,
          email: email,
          password: password1,
          verify_password: password2,
        });

        const { data } = response;

        // Check response successful
        if (response.status === 200) {
          setApiRequestError(false);
          setUsername('');
          setEmail('');
          setPassword1('');
          setPassword2('');
          navigation.navigate('Login');
        } else {
          //red text error produced by server
          setServerError(true);
        }
      } catch (error: any) {
        //red text error produced by requesting error
        setApiRequestError(true);

        const apiError: any = error;

        console.log(apiError.response?.data);
        //this recevieves error message
        const errors = apiError.response?.data;

        //this parses the error message
        const extractedValues = Object.values(errors).flat();
        const errorMessages = extractedValues.join(' ');

        //this sends the error message to be displayed
        setApiRequestErrorMessage(errorMessages);
      }
    }
  };
  //this resets values after the page is focused.
  useEffect(() => {
    setUsername('');
    setEmail('');
    setPassword1('');
    setPassword2('');
    setKey(Math.random());
    return () => {};
  }, []);

  const getPasswordStrengthMessage = (
    passwordStrengthValue: string,
  ): string => {
    if (passwordStrengthValue !== 'Strong') {
      return '(needs 10 chararacters, capitals, numbers and symbols)';
    } else {
      return '';
    }
  };

  return (
    <LinearGradient
      //the key forces a Re-render of the page:
      key={key}
      style={styles.RegistrationContainer}
      colors={['#251D3A', global.background]}
      start={{ x: 1, y: 0 }}>
      <View style={styles.container}>
        <View style={styles.logo}>
          {/* <Logo size={200} /> */}
          <Icon
            source={require('../assets/logo-with-name.png')}
            size={200}></Icon>
        </View>
        <Title title="Register" titleSize={30} />
        <InputField
          placeholder="Email"
          onChangeText={input => handleEmail(input)}
          value={email}
          width={280}
          maxLength={30}
        />
        {/* When the emailFormatError is true, the red text tells following. */}
        {emailFormatError && (
          <Text style={{ color: global.error, fontSize: 15 }}>
            Invalid email format. Please use a valid email address (e.g.,
            abc@gmail.com).
          </Text>
        )}
        <InputField
          placeholder="Username"
          onChangeText={input => handleUsername(input)}
          value={username}
          width={280}
          maxLength={20}
        />
        {/* When the usernameLengthError is true, the red text tells following. */}
        {usernameLengthError && (
          <Text style={{ color: global.error, fontSize: 15 }}>
            Username is too short. Enter more than 8 characters.
          </Text>
        )}
        <InputField
          placeholder="Password"
          onChangeText={input => handlePassword1(input)}
          value={password1}
          secureTextEntry={true}
          width={280}
          maxLength={25}
        />
        <InputField
          placeholder="Confirm Password"
          onChangeText={input => handlePassword2(input)}
          value={password2}
          secureTextEntry={true}
          width={280}
          maxLength={25}
        />
        {/* When the passwordMatch is true, the red text tells following. */}
        {passwordsMatchError && (
          <Text style={{ color: global.error, fontSize: 15 }}>
            Password do not match.
          </Text>
        )}
        {/* When the credentialFilledinError is true, the red text tells following. */}
        {credentialFilledInError && (
          <Text style={{ color: global.error, fontSize: 15 }}>
            Please fill in credentials.
          </Text>
        )}
        {/* When the serverError is true, the red text tells following. */}
        {serverError && (
          <Text style={{ color: global.error, fontSize: 15 }}>
            Server error, unable to process.
          </Text>
        )}
        {/* When the apiRquestError is true, the red text tells following. */}
        {apiRequestError && (
          <Text style={{ color: global.error, fontSize: 15 }}>
            {apiRequestErrorMessage || 'Request error, unable to process.'}
          </Text>
        )}
        {/* When the passwordMatchError is false, the red text tells password strength. */}
        {password1 && passwordStrengthError && (
          <Text
            style={{
              color: global.secondary,
              fontSize: 15,
            }}>
            Password Strength:{' '}
            <Text
              style={{
                color: passwordStrengthColor(passwordStrength(password1).id)
                  .color,
              }}>
              {passwordStrength(password1).value}
            </Text>
            <View>
              <Text
                style={{
                  color: passwordStrengthColor(passwordStrength(password1).id)
                    .color,
                }}>
                {getPasswordStrengthMessage(passwordStrength(password1).value)}
              </Text>
            </View>
          </Text>
        )}
        <View>
          <View style={styles.button}>
            <Button
              testID="register-button"
              title="Register"
              onPress={() => handleButtonOnPress()}
            />
          </View>
          <Text style={styles.login}>
            <Texts
              texts="     Already a member?"
              textsSize={18}
              onPress={() => handleLoginNavigation()}
            />
            <Texts
              textsColor={global.secondary}
              texts="  Sign in"
              textsSize={18}
              onPress={() => handleLoginNavigation()}
            />
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
};

export default Registration;
