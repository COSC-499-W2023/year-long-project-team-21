import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Title from '../components/Title';
import Texts from '../components/Text';
import Button from '../components/Button';
import style from '../styles/instructionStyles';
import TextImage from '../components/TextImage';

const Instruction = ({ navigation }: { navigation: any }) => {
  const handleButtonOnPress = async () => {};
  const instructions = [
    {
      key: '1',
      txt: 'See what others are offering',
      image: require('../assets/banana.png'),
      size: 60,
    },
    {
      key: '2',
      txt: 'Select the range',
      image: require('../assets/select-range.png'),
      size: 120,
    },
    {
      key: '3',
      txt: 'See how long food will expire in',
      image: require('../assets/expiry.png'),
      size: 80,
    },
    {
      key: '3',
      txt: 'Create your own food ads',
      image: require('../assets/ad.png'),
      size: 60,
    },
    {
      key: '4',
      txt: 'edit and delete ads with your account',
      image: require('../assets/account.png'),
      size: 60,
    },
  ];

  const list = () => {
    return instructions.map(element => {
      return (
        <TextImage
          text={element.txt}
          source={element.image}
          size={element.size}
        />
      );
    });
  };

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
        {list()}
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
