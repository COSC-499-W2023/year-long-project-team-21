import { View, Text, TextInput, StyleSheet, Alert, SafeAreaView} from "react-native"
import React, {ChangeEvent, useState} from "react";
import Button from "../components/Button"
import Header from "../components/Header";
import Title from "../components/Title";
import InputField from "../components/InputField";

const Login = () => {

    const [text1, setText1] = useState('');
    const [text2, setText2] = useState('');

    //Checks if the username&password is empty. If not, then we proceed to check the credential to the backend
    const handleButtonOnPress = () =>{
      //later we can preprocess the input type for now, we assume it is string
        if(text1=='' && text2==''){
          Alert.alert("please fill in the credentials")
        }else{
          //initiate sending request here?
          
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