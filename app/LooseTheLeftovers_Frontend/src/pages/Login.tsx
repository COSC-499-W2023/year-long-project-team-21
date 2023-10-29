import { View, Text, TextInput, StyleSheet, Alert, SafeAreaView} from "react-native"
import React, {ChangeEvent, useState} from "react";
// import axios from 'axios';
import Button from "../components/Button"
import Header from "../components/Header";
import Title from "../components/Title";
import InputField from "../components/InputField";

const Login = () => {

    const [text1, setText1] = useState('');
    const [text2, setText2] = useState('');

    //Checks if the username&password is empty. If not, then we proceed to check the credential to the backend
    const handleButtonOnPress = async () => {
      // later we can preprocess the input type for now, we assume it is string
      if (text1 === '' || text2 === '') {
          Alert.alert('Error', 'Please fill in the credentials.');
      } else {
          try {
              console.log("Before request");

              const response = await fetch("127.0.0.1:8000/users/token", {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                      username: text1,
                      password: text2,
                  }),
              });
  
              const data = await response.json();
              console.log("After request");
  
              console.log(response);
              console.log(data.token);
              // Check response successful
              if (response.ok && data.token) {
                  Alert.alert('Login Successful', `Token: ${data.token}`);
              } else {
                  Alert.alert('Error', 'Failed to login or retrieve token.');
              }
          } catch (error) {
              console.log("Error during fetch:", error);
              Alert.alert('Error', 'An error occurred while trying to retrieve data.');
          }
      }
  }  

    //Set input text from the text box so that we can handle the credential (username)
    const handleUsername = (input: string) => {
          setText1(input)
          
    }
    //Set input text from the text box so that we can handle the credential (password)
    const handlePassword = (input:string) => {
          setText2(input)
    }

    return (
      <SafeAreaView style = {styles.LoginContainer}>
      <Header image=""/>
      <InputField placeholder="Username" onChangeText = {input => handleUsername(input)} value = {text1}/>
      <InputField placeholder="Password" onChangeText = {input => handlePassword(input)} value = {text2}/>
      <Button title = "Login" onPress={()=>handleButtonOnPress()}/>
      </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    
    LoginContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },

})
export default Login;