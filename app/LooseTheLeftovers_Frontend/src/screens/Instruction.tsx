import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Title from '../components/Title';
import Texts from '../components/Text';
import Button from '../components/Button';

const Instruction = ({ navigation }: { navigation: any }) => {
  const handleButtonOnPress = async () => {};

  return (
    //displays insntructions
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Title //displays weclome message
        position={50}
        pad={20}
        titleSize={50}
        titleColor="#FFB800"
        title="Weclome!"
      />

      <Texts //displays instruction
        position={15}
        pad={15}
        textsSize={20}
        texts="-This is an app to share left over to others in need"
      />
      <Texts //displays instruction
        position={15}
        pad={20}
        textsSize={20}
        texts="-You can view others food posts, makes posts yourself and communicate with other users to set a time and place for pickup"
      />
      <Texts //displays instruction
        position={15}
        pad={20}
        textsSize={20}
        texts="-It has some unique features like the ability how long the food will expire in, and the ability end a conversation once a deal has been made."
      />

      <Button //displays get started button. Will navigate to home screen
        onPress={handleButtonOnPress}
        title="Get Started"
        buttonSize={200}
      />
    </View>
  );
};

export default Instruction;
