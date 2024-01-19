import Logo from '../components/Logo';
import { SafeAreaView, Text, View } from 'react-native';
import styles from '../styles/registrationStyles';
import React, { useState } from 'react';
import Texts from '../components/Text';
import InputField from '../components/InputField';
import Button from '../components/Button';
import Title from '../components/Title';
import axios from 'axios';
import * as EmailValidator from 'email-validator';
import { passwordStrength } from 'check-password-strength';
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
  const [passwordsMatchError, setPasswordsMatchError] = useState(false);
  const [usernameLengthError, setUsernameLengthError] = useState(false);
  const [emailFormatError, setEmailFormatError] = useState(false);
  const [serverError, setServerError] = useState(false);
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
        return { color: '#FC7676' };
      case 1:
        return { color: '#FFB800' };
      case 2:
        return { color: '#96EEE5' };
      case 3:
        return { color: '#85F773' };
      default:
        return { color: 'white' };
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
        if (response.status === 200 && data.token) {
          setUsername('');
          setEmail('');
          setPassword1('');
          setPassword2('');
          navigation.navigate('Instruction');
        } else {
          //red text error produced by server
          setServerError(true);
        }
      } catch (error) {
        //red text error produced by requesting error
        setApiRequestError(true);
        console.log(error);
      }
    }
  };

  return (
    <SafeAreaView style={styles.RegistrationContainer}>
      <View style={styles.container}>
        <Logo LogoSize={40} />
        <Title title="Register" titleSize={30} />
        <InputField
          placeholder="+Email"
          onChangeText={input => handleEmail(input)}
          value={email}
        />
        {/* When the emailFormatError is true, the red text tells following. */}
        {emailFormatError && (
          <Text style={{ color: 'red', fontSize: 15 }}>
            Invalid email format. Please use a valid email address (e.g.,
            abc@gmail.com).
          </Text>
        )}
        <InputField
          placeholder="+Username"
          onChangeText={input => handleUsername(input)}
          value={username}
        />
        {/* When the usernameLengthError is true, the red text tells following. */}
        {usernameLengthError && (
          <Text style={{ color: 'red', fontSize: 15 }}>
            Username is too short. Enter more than 8 characters.
          </Text>
        )}
        <InputField
          placeholder="+Password"
          onChangeText={input => handlePassword1(input)}
          value={password1}
          secureTextEntry={true}
        />
        <InputField
          placeholder="+Confirm Password"
          onChangeText={input => handlePassword2(input)}
          value={password2}
          secureTextEntry={true}
        />
        {/* When the passwordMatch is true, the red text tells following. */}
        {passwordsMatchError && (
          <Text style={{ color: 'red', fontSize: 15 }}>
            Password do not match.
          </Text>
        )}
        {/* When the credentialFilledinError is true, the red text tells following. */}
        {credentialFilledInError && (
          <Text style={{ color: 'red', fontSize: 15 }}>
            Please fill in credentials.
          </Text>
        )}
        {/* When the serverError is true, the red text tells following. */}
        {serverError && (
          <Text style={{ color: 'red', fontSize: 15 }}>
            Server error, unable to process.
          </Text>
        )}
        {/* When the apiRquestError is true, the red text tells following. */}
        {apiRequestError && (
          <Text style={{ color: 'red', fontSize: 15 }}>
            Request error, unable to process.
          </Text>
        )}
        {/* When the passwordMatchError is false, the red text tells password strength. */}
        {password1 && passwordStrengthError && (
          <Text style={{ color: '#FFFFFF', fontSize: 15 }}>
            Password Strength:{' '}
            <Text
              style={{
                color: passwordStrengthColor(passwordStrength(password1).id)
                  .color,
              }}>
              {passwordStrength(password1).value}
            </Text>
          </Text>
        )}
        <View style={styles.button}>
          <Button
            testID="register-button"
            title="Register"
            onPress={() => handleButtonOnPress()}
          />
        </View>
        <Texts
          texts="Login"
          textsSize={18}
          onPress={() => handleLoginNavigation()}
        />
      </View>
    </SafeAreaView>
  );
};

export default Registration;