import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Title from '../components/Title';
import Texts from '../components/Text';
import Button from '../components/Button';
import style from '../styles/instructionStyles';
import Icon from '../components/Icon';

const Instruction = ({ navigation }: { navigation: any }) => {
  const handleButtonOnPress = async () => {};

  return (
    <View style={style.container}>
      <View style={style.title}>
        <Title //displays weclome message
          titleSize={50}
          titleColor="#FFB800"
          title="Weclome!"
        />
      </View>
      <View style={style.instruction}>
        <Texts //displays instruction
          textsSize={20}
          texts="This is an app to share left over food to others in need"
        />
        <View style={style.textimage}>
          <View style={style.text}>
            <Texts //displays instruction
              textsSize={20}
              texts="See what others are offering"
            />
          </View>
          <View style={style.image}>
            <Icon size={60} source={require('../assets/banana.png')} />
          </View>
        </View>
        <View style={style.textimage}>
          <View style={style.text}>
            <Texts //displays instruction
              textsSize={20}
              texts="Select the range"
            />
          </View>
          <View style={style.image}>
            <Icon size={120} source={require('../assets/select-range.png')} />
          </View>
        </View>
        <View style={style.textimage}>
          <View style={style.text}>
            <Texts //displays instruction
              textsSize={20}
              texts="See how long food will expire in"
            />
          </View>
          <View style={style.image}>
            <Icon size={80} source={require('../assets/expiry.png')} />
          </View>
        </View>
        <View style={style.textimage}>
          <View style={style.text}>
            <Texts //displays instruction
              textsSize={20}
              texts="Create your own food ads"
            />
          </View>
          <View style={style.image}>
            <Icon size={60} source={require('../assets/Ad.png')} />
          </View>
        </View>
        <View style={style.textimage}>
          <View style={style.text}>
            <Texts //displays instruction
              textsSize={20}
              texts="edit and delete ads with your account"
            />
          </View>
          <View style={style.image}>
            <Icon size={60} source={require('../assets/account.png')} />
          </View>
        </View>
      </View>
      <View style={style.button}>
        <Button //displays get started button. Will navigate to home screen
          onPress={handleButtonOnPress}
          title="Get Started"
          buttonSize={200}
        />
      </View>
    </View>
  );
};

export default Instruction;
