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
  const [emailExistsError, setEmailExistsError] = useState(false);
  const [usernameExistsError, setUsernameExistsError] = useState(false);
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
    setEmailExistsError(false);
    setUsernameExistsError(false);
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
          setEmailExistsError(false);
          setUsernameExistsError(false);
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
        const apiError: any = error;
        if (
          apiError.response?.data &&
          JSON.stringify(apiError.response.data).includes(
            'A user with that email already exists.',
          )
        ) {
          setEmailExistsError(true);
        }

        if (
          apiError.response?.data &&
          JSON.stringify(apiError.response.data).includes(
            'A user with that username already exists.',
          )
        ) {
          setUsernameExistsError(true);
        }
        {
          setApiRequestError(true);
        }
      }
    }
  };

  return (
    <LinearGradient
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
        />
        <InputField
          placeholder="Confirm Password"
          onChangeText={input => handlePassword2(input)}
          value={password2}
          secureTextEntry={true}
          width={280}
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
            Request error, unable to process.
          </Text>
        )}
        {emailExistsError && (
          <Text style={{ color: global.error, fontSize: 15 }}>
            A user with that email already exists
          </Text>
        )}
        {usernameExistsError && (
          <Text style={{ color: global.error, fontSize: 15 }}>
            A user with that username already exists
          </Text>
        )}
        {/* When the passwordMatchError is false, the red text tells password strength. */}
        {password1 && passwordStrengthError && (
          <Text style={{ color: global.secondary, fontSize: 15 }}>
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
