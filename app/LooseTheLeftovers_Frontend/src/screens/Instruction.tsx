import React from 'react';
import { View, Text } from 'react-native';
import style from '../styles/instructionStyles';
import Title from '../components/Title';
import Texts from '../components/Text';
import Button from '../components/Button';
import TextImage from '../components/TextImage';
import { global } from '../common/global_styles';

const Instruction = ({ navigation }: { navigation: any }) => {
  const handleButtonOnPress = async () => {
    navigation.navigate('Home');
  };
  // Creates an array of the instructions and images
  const instructions = [
    {
      id: 1,
      txt: 'See what others are offering',
      image: require('../assets/banana.png'),
      size: 60,
    },
    {
      id: 2,
      txt: 'Select the range',
      image: require('../assets/select-range.png'),
      size: 100,
    },
    {
      id: 3,
      txt: 'See how long food will expire in',
      image: require('../assets/expiry.png'),
      size: 80,
    },
    {
      id: 4,
      txt: 'Create your own food ads',
      image: require('../assets/ad.png'),
      size: 40,
    },
    {
      id: 5,
      txt: 'edit and delete ads with your account',
      image: require('../assets/account.png'),
      size: 40,
    },
  ];
  // Loops through the array and returns the entire instruction
  const list = () => {
    return instructions.map(element => {
      return (
        <TextImage
          key={element.id}
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
        <Title // Displays weclome message
          titleSize={50}
          titleColor={global.secondary}
          title="Welcome!"
        />
      </View>
      <View style={style.instruction}>
        <Texts // Displays the first text
          textsSize={20}
          texts="This is an app to share left over food to others in need"
          textsColor={global.secondary}
          // The list below displays the entire instruction and images
        />

        {list()}
      </View>

      <View style={style.button}>
        <Button // Displays get started button. Will navigate to home screen
          onPress={handleButtonOnPress}
          title="Get Started"
          buttonSize={200}
        />
      </View>
    </View>
  );
};

export default Instruction;
