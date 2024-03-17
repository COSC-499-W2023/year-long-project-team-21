import { Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import styles from '../styles/editProfileStyle';
import LinearGradient from 'react-native-linear-gradient';
import InputField from '../components/InputField';
import { global } from '../common/global_styles';
import Button from '../components/Button';
import { SecureAPIReq } from '../common/NetworkRequest';
import { users } from '../common/API';
import { passwordStrength } from 'check-password-strength';

const EditProfile = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const wiggledColor = 'gray';
  const unWiggledColor = 'white';
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setCofrimPass] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [lastname, setLastname] = useState('');
  const [firstname, setFirstname] = useState('');
  const [isRightVisible, setisRightVisible] = useState(false);
  const [isLeftVisible, setIsLeftVisible] = useState(true);
  const [leftColor, setLeftColor] = useState(unWiggledColor);
  const [rightColor, setRightColor] = useState(wiggledColor);
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(true);
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(true);
  const data = route.params;

  /**
   * Handles button press event to cancel profile editing.
   *
   * @returns {void}
   */
  const handleCancelEditing = () => {
    navigation.goBack();
  };

  /**
   * Handles the submission of new profile information.
   * This function logs the submission details, updates the local state with new username and email,
   * and sends a request to update the user's profile information.
   *
   * @returns {void}
   */
  const handleNewProfileInfoSubmission = async () => {
    console.log('new first name: ', firstname);
    console.log('new last name: ', lastname);
    console.log('new email: ', newEmail);
    console.log(data);
    //check username and email input format
    try {
      const req: any = await SecureAPIReq.createInstance();
      const endpoint = users;
      const response = await req.put(endpoint, {
        email: newEmail,
        first_name: firstname,
        last_name: lastname,
      });
      //   Check response successful
      if (response.status === 200) {
        console.log('request is submitted');
        navigation.navigate('Profile');
      } else {
        //red text error produced by server
        console.log('server error');
      }
    } catch (error: any) {
      //red text error produced by requesting error
      console.log(error);
    } finally {
      setFirstname('');
      setLastname('');
      setNewEmail('');
    }
  };

  const handleUpdatePassword = async () => {
    console.log('old password: ', oldPass);
    console.log('new password: ', newPass);
    console.log('confirm password: ', confirmPass);
    if (newPass.length !== 0 && confirmPass.length !== 0) {
      console.log('Input is not empty');
      setIsPasswordEmpty(true);
      setIsPasswordCorrect(true);
      setIsPasswordMatch(true);
      console.log("Password strength is: ", passwordStrength(newPass).id)
      if (passwordStrength(newPass).id > 1) {
        console.log('Password strength is pass level')
        try {
          const req: any = await SecureAPIReq.createInstance();
          const endpoint = users;
          const response = await req.put(endpoint, {
            old_password: oldPass,
            new_password: newPass,
            confirm_password: confirmPass,
          });
          if (response.status === 200) {
            console.log('request submitted');
            setOldPass('');
            setNewPass('');
            setCofrimPass('');
            navigation.navigate('Profile');
          } else {
            console.log(`Server returned status code: ${response.status}`);
          }
        } catch (error: any) {
          console.log(error);
          if (error.response.status === 401) {
            //red text error produced by server
            console.log("Wrong Password");
            setIsPasswordCorrect(false);
            setIsPasswordEmpty(true);
            setIsPasswordMatch(true);
          } else if (error.response.status === 400) {
            console.log("Password Unmatch")
            setIsPasswordMatch(false);
            setIsPasswordEmpty(true);
            setIsPasswordCorrect(true);
          }
        }
      }
    } else if (newPass == '' || confirmPass == '' || oldPass == '') {
      setIsPasswordEmpty(false);
    } 
  };

  const wiggleStatetoLeft = () => {
    if (isRightVisible) {
      setisRightVisible(false);
      setIsLeftVisible(true);
      setLeftColor(unWiggledColor);
      setRightColor(wiggledColor);
      setIsPasswordEmpty(true);
      setIsPasswordMatch(true);
      setIsPasswordCorrect(true);
      setOldPass('');
      setNewPass('');
      setCofrimPass('');
    }
  };

  const wiggleStatetoRight = () => {
    if (isLeftVisible) {
      setisRightVisible(true);
      setIsLeftVisible(false);
      setLeftColor(wiggledColor);
      setRightColor(unWiggledColor);
    }
  };

  const renderWiggleClicks = () => {
    return (
      <View style={styles.wiggleClicks}>
        <View>
          <TouchableOpacity onPress={() => wiggleStatetoRight()}>
            <Text style={{ ...styles.leftClick, color: rightColor }}>
              {' '}
              Personal Info{' '}
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text> </Text>
        </View>
        <View>
          <TouchableOpacity onPress={() => wiggleStatetoLeft()}>
            <Text style={{ ...styles.rightClick, color: leftColor }}>
              {' '}
              Password{' '}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderPasswordUnmatchMessage = () => {
    return (
      <Text style={styles.passwordStrengthWarningContainer}>
        Password Unmatch is Detected.
      </Text>
    );
  };

  const renderPasswordEmptyMessage = () => {
    return (
      <Text style={styles.passwordStrengthWarningContainer}>
        Empty Input is Detected.
      </Text>
    );
  };

  const renderPasswordEUncorrectMessage = () => {
    return (
      <Text style={styles.passwordStrengthWarningContainer}>
        Your OLD PASSWORD is Wrong.
      </Text>
    );
  };

  const renderPasswordStrengthMessage = () => {
    let passStrengthColor = changePasswordStrengthColor(
      passwordStrength(newPass).id,
    );
    return (
      <>
        <Text
          style={{
            ...styles.passwordStrengthWarningContainer,
            color: 'white',
            borderBottomColor: passStrengthColor,
          }}>
          Password Strength: {passwordStrength(newPass).value}
        </Text>
        <Text
          style={{
            ...styles.passwordStrengthWarningContainer,
            color: passStrengthColor,
          }}>
          Password Requirement:
          {'\n'}- Contain at least 1 LOWERCASE letter
          {'\n'}- Contain at least 1 UPPERCASE letter
          {'\n'}- Contain at least 1 NUMERIC character
          {'\n'}- Contain at least 1 SPECIAL character
          {'\n'}- At least 8 characters long for Medium strength
          {'\n'}- At least 10 characters long for Strong strength
        </Text>
      </>
    );
  };

  const changePasswordStrengthColor = (strengthId: number) => {
    switch (strengthId) {
      case 0:
        return global.pass_strength.zero;
      case 1:
        return global.pass_strength.one;
      case 2:
        return global.pass_strength.two;
      case 3:
        return global.pass_strength.three;
      default:
        return global.pass_strength.zero;
    }
  };

  return (
    <LinearGradient
      style={styles.container}
      colors={['#251D3A', global.background]}
      start={{ x: 1, y: 0 }}>
      <View>
        <Text style={styles.titleContainer}>Edit Profile</Text>
      </View>
      {isRightVisible && (
        <>
          {renderWiggleClicks()}
          <View style={styles.inputFieledContainer}>
            <Text style={styles.inputFieldTitleContainer}>FIRST NAME : </Text>
            <InputField
              placeholder={'First name'}
              onChangeText={newNameText => setFirstname(newNameText)}
              value={firstname}></InputField>
          </View>
          <View style={styles.inputFieledContainer}>
            <Text style={styles.inputFieldTitleContainer}>LAST NAME : </Text>
            <InputField
              placeholder={'Last name'}
              onChangeText={newNameText => setLastname(newNameText)}
              value={lastname}></InputField>
          </View>
          <View style={styles.inputFieledContainer}>
            <Text style={styles.inputFieldTitleContainer}>EMAIL : </Text>
            <InputField
              placeholder={'Email'}
              onChangeText={newText => setNewEmail(newText)}
              value={newEmail}></InputField>
          </View>
        </>
      )}
      {isLeftVisible && (
        <>
          {renderWiggleClicks()}
          <View style={styles.inputFieledContainer}>
            <Text style={styles.inputFieldTitleContainer}>OLD PASSWORD : </Text>
            <InputField
              placeholder={'Old Password'}
              onChangeText={oldPass => setOldPass(oldPass)}
              value={oldPass}></InputField>
          </View>
          <View style={styles.inputFieledContainer}>
            <Text style={styles.inputFieldTitleContainer}>NEW PASSWORD : </Text>
            <InputField
              placeholder={'New Password'}
              onChangeText={newPass => setNewPass(newPass)}
              value={newPass}></InputField>
            {!(newPass == '') && renderPasswordStrengthMessage()}
          </View>
          <View style={styles.inputFieledContainer}>
            <Text style={styles.inputFieldTitleContainer}>
              CONFIRM PASSWORD :{' '}
            </Text>
            <InputField
              placeholder={'Confirm Password'}
              onChangeText={confirmPass => setCofrimPass(confirmPass)}
              value={confirmPass}></InputField>
            {!isPasswordEmpty && renderPasswordEmptyMessage()}
            {!isPasswordMatch && renderPasswordUnmatchMessage()}
            {!isPasswordCorrect && renderPasswordEUncorrectMessage()}
          </View>
        </>
      )}
      <View style={styles.modalButtonContainer}>
        <Button
          backgroundcolor="red"
          buttonSize={150}
          onPress={handleCancelEditing}
          title="Cancel"></Button>
        <Button
          buttonSize={150}
          onPress={
            isRightVisible
              ? handleNewProfileInfoSubmission
              : handleUpdatePassword
          }
          title="Update"></Button>
      </View>
    </LinearGradient>
  );
};

export default EditProfile;
