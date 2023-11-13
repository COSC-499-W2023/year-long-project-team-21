import Logo from "../components/Logo";
import {Alert, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import styles from "../styles/registrationStyles";
import React, { useState } from "react";
import InputField from "../components/InputField";
import Button from "../components/Button";
import Title from "../components/Title";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from "axios";

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
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [passwordsMatch, setPasswordsMatch] = useState(true);

    //set input text from the text box so that we can handle credential (Email)
    const handleEmail = (input: string) => {
        setEmail(input);
    }
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
    //Handle password visibility for password 1
    const togglePaswordVisibility1 = () => {
        setShowPassword1(!showPassword1);
    }
    //Handle password visibility for password 2
    const togglePaswordVisibility2 = () => {
        setShowPassword2(!showPassword2);
    }
    //Checks following cases: Any credentials are not provided, password unmatched, password matched&credentials are filled
    const handleButtonOnPress = async () => {
        //Checks if any credentials are missing
        if(email==""||username==""||password1==""||password2==""){
            Alert.alert("Please fill out your credentials")
        }else if(password1!=password2){
            setPasswordsMatch(false);
        }else{
            setPasswordsMatch(true);
            //Send request: 
            try {
                const apiUrl = 'http://10.0.2.2:8000/users/';
        
                const response = await axios.post(apiUrl, {
                  username: username,
                  email: email,
                  password: password1,
                  verify_password: password2
                });
        
                const { data } = response;
        
                // Check response successful
                if (response.status === 200 && data.token) {
                  navigation.navigate('Login');
                  Alert.alert('Registration Successful', `Token: ${data.token}`);
                } else {
                  Alert.alert('Error', 'Failed to register or retrieve token.');
                }
              } catch (error) {
                Alert.alert(
                  'Error',
                  'An error occurred while trying to register',
                );
                console.log(error)
              }
            }
        }
    
    
    return(  
        <SafeAreaView style={styles.RegistrationContainer}>
            <View style={styles.container}>
                <View style={styles.logo}>
                    <Logo LogoSize={40}/> 
                </View>
                <Title title="Register" titleSize={30}/>
                <InputField
                    placeholder="+Email"
                    onChangeText={input => handleEmail(input)}
                    value={email}
                />
                <InputField
                    placeholder="+Username"
                    onChangeText={input => handleUsername(input)}
                    value={username}
                />
                <View style={styles.passwordContainer}>
                    <TextInput
                    placeholder="+Password"
                    onChangeText={input => handlePassword1(input)}
                    value={password1}
                    secureTextEntry={!showPassword1}
                    style={styles.input}
                    />
                    <TouchableOpacity onPress={togglePaswordVisibility1} style={styles.icon}>
                        <MaterialCommunityIcons 
                        name={ showPassword1 ? 'eye-off' :'eye'} 
                        size={20} 
                        color="grey" 
                    />
                    </TouchableOpacity>
                </View>
                <View style={styles.passwordContainer}>
                    <TextInput
                    placeholder="+Confirm Password"
                    onChangeText={input => handlePassword2(input)}
                    value={password2}
                    secureTextEntry={!showPassword2}
                    style={styles.input}
                    />
                    <TouchableOpacity onPress={togglePaswordVisibility2} style={styles.icon}>
                        <MaterialCommunityIcons 
                        name={ showPassword1 ? 'eye-off' :'eye'} 
                        size={20} 
                        color="grey" 
                    />
                    </TouchableOpacity>
                </View>
                {/* When the passwordMatch is false, the red text tells following. */}
                {!passwordsMatch && (
                    <Text style={{ color:"red" ,fontSize: 15}}>Password do not match</Text>
                )}
                <View style={styles.button}>
                    <Button testID="register-button" title="Register" onPress={() => handleButtonOnPress()} />
                </View>
            </View>
            
        
        </SafeAreaView>
     
    );
};


export default Registration;