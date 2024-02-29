import React, { useState } from "react";
import { View, TextInput, Button } from "react-native";
import Text from "../components/Text";
import { resetPassword } from "../common/ResetPassword";

const ForgotPassword = ({ navigation }: { navigation: any }) => {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("")
    const [confirmedPassword, setConfirmedPassword] = useState("")

    const handleResetPassword = () => {
        try{
           let pass = [newPassword, confirmedPassword]
           resetPassword(pass);
        }catch(error){

        }
    };

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text texts="Forgot Password"/>
            <TextInput
                style={{ height: 40, width: "80%", borderColor: "gray", borderWidth: 1, marginBottom: 20, paddingHorizontal: 10 }}
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <Button title="Reset Password" onPress={handleResetPassword} />
        </View>
    );
}

export default ForgotPassword;
