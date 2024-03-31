import React, { useState, useEffect, useRef } from 'react';
import { Animated } from 'react-native';
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
import { resetTKVF, confirmReset } from '../common/API';
import axios from 'axios';

interface PasswordResetProps {
  navigation: any;
  route: any;
}

const PasswordReset: React.FC<PasswordResetProps> = ({ navigation, route }) => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [passwords, setPasswords] = useState<string[]>(['', '']);
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [showPasswordFields, setShowPasswordFields] = useState<boolean>(false);

  const slideAnim = useRef(new Animated.Value(0)).current;

  /********************************** ANIMATION LOGIC  **********************************/

  const animate = () => {
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  /********************************** STATE CHANGE LOGIC  **********************************/

  const handlePasswordChange = (index: number, value: string) => {
    const updatedPasswords = [...passwords];
    updatedPasswords[index] = value;
    setPasswords(updatedPasswords);
  };

  /********************************** ONPRESS LOGIC  **********************************/

  const handleVerificationCodeSubmit = async () => {
    const body = { token: verificationCode };
    const payload: any = await apiCall(body, resetTKVF);
    if (payload.status == 200) {
      setErrorMessage('');
      setShowPasswordFields(true);
      animate();
    }
  };

  const handlePasswordReset = async () => {
    if (passwords[0] !== passwords[1]) {
      setErrorMessage('Passwords do not match!');
    } else {
      const body = { password: passwords[0], token: verificationCode };
      const payload: any = await apiCall(body, confirmReset);
      if (payload.status == 200) {
        navigation.navigate('DoneResetPW');
      }
    }
  };

  /********************************** BACKEND REQUEST LOGIC  **********************************/

  const handleNetworkError = (error: any) => {
    if (axios.isAxiosError(error) && error.response) {
      const responseData = error.response.data;
      console.log(responseData);
      const key = Object.keys(responseData)[0];
      setErrorMessage(responseData[key]);
      return error.response.status;
    } else {
      // Handle errors that aren't related to Axios' responses
      setErrorMessage(`An unexpected error occurred: ${error}`);
      return undefined;
    }
  };

  const apiCall = async (body: any, endpoint: string) => {
    // now that I think about it, state is global variables. And global variables are just kind of... gross
    try {
      const payload = await axios.post(endpoint, body, djangoConfig());
      return payload;
    } catch (error) {
      return handleNetworkError(error);
    }
  };

  const verificationNode = () => {
    return (
      <>
        <InputField
          placeholder="Verification code"
          onChangeText={setVerificationCode}
          value={verificationCode}
          width={280}
        />
        <Button
          title="Verify Code"
          onPress={handleVerificationCodeSubmit}
          buttonSize={250}
          textSize={15}
        />
      </>
    );
  };

  const passwordResetNode = () => {
    return (
      <Animated.View
        style={{
          transform: [
            {
              translateY: slideAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [50, 0],
              }),
            },
          ],
          opacity: slideAnim,
        }}>
        <InputField
          placeholder="Enter a password"
          onChangeText={input => handlePasswordChange(0, input)}
          secureTextEntry={true}
          value={passwords[0]}
          width={280}
        />
        <InputField
          placeholder="Confirm password"
          onChangeText={input => handlePasswordChange(1, input)}
          secureTextEntry={true}
          value={passwords[1]}
          width={280}
        />
        <Button
          title="Reset Password"
          onPress={handlePasswordReset}
          buttonSize={250}
          textSize={15}
        />
      </Animated.View>
    );
  };

  return (
    <LinearGradient
      style={styles.LoginContainer}
      colors={[global.purple, global.background]}
      start={{ x: 1, y: 0 }}>
      <Icon source={require('../assets/logo-with-name.png')} size={200} />
      <Title title="New Password" titleSize={30} />
      <Title
        title="Enter the verification code sent to your email"
        titleSize={15}
      />

      {showPasswordFields ? passwordResetNode() : verificationNode()}
      {errorMessage !== '' && (
        <Texts texts={errorMessage} textsSize={14} textsColor="red" />
      )}
    </LinearGradient>
  );
};

export default PasswordReset;
