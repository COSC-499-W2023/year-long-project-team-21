import React, { useState } from 'react';
import { View } from 'react-native';
import Text from '../components/Text';
import { resetPassword } from '../common/ResetPassword';
import InputField from '../components/InputField';
import styles from '../styles/forgotPasswordStyles';
import { global } from '../common/global_styles';
import LinearGradient from 'react-native-linear-gradient';
import Button from '../components/Button';
import GoBackIcon from '../components/GoBackIcon';
const ForgotPassword = ({ navigation }: { navigation: any }) => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');

  const handleResetPassword = () => {
    try {
      let pass = [newPassword, confirmedPassword];
      console.log(pass);
      //   resetPassword(pass);
    } catch (error) {}
  };

  return (
    <>
      <LinearGradient
        style={styles.backgroundContainer}
        colors={['#251D3A', global.background]}
        start={{ x: 1, y: 0 }}>
        <View style={styles.backIcon}>
          <GoBackIcon />
        </View>
        <Text texts="Forgot Password"/>
        <View style={styles.inputContainer}>
          <InputField
            placeholder={'Enter Your Email or Username'}
            onChangeText={newPass => setNewPassword(newPass)}
            value={newPassword}
          />
          <InputField
            placeholder={'Enter New Password'}
            onChangeText={newPass => setNewPassword(newPass)}
            value={newPassword}
          />
          <InputField
            placeholder={'Confirm Password'}
            onChangeText={conPass => setConfirmedPassword(conPass)}
            value={confirmedPassword}
          />
        </View>
        <View style={styles.buttonContainer}>
        <Button title="Reset Password" onPress={handleResetPassword} />
        </View>
      </LinearGradient>
    </>
  );
};

export default ForgotPassword;
