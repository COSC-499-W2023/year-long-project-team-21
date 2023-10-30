import React from 'react';
import { Text, View } from 'react-native';
import Title from '../components/Title';
import { styles } from '../styles/appStyles';

function Instruction() {
  return (
    <View>
      <View>
        <Text style={[{ top: 90 }]}>
          <View>
            <Title title="Welcome to Lose the leftovers!" />
          </View>
        </Text>
        <Text style={[{ top: 140 }]}>
          <View>
            <Title title=" The + button allows you to create" />
          </View>
        </Text>
        <Text style={[{ top: 140 }]}>
          <View>
            <Title title=" an advertisment to share your food" />
          </View>
        </Text>
        <Text style={[{ top: 170 }]}>
          <View>
            <Title title="You can see how long other people's posts" />
          </View>
        </Text>
        <Text style={[{ top: 170 }]}>
          <View>
            <Title
              title="will expire in
          wether it's 2 days or 2 weeks"
            />
          </View>
        </Text>
        <View>
          <Text style={[{ top: 200 }]}>
            <View>
              <Title title="You can view your account to see your " />
            </View>
          </Text>
        </View>
        <View>
          <Text style={[{ top: 200 }]}>
            <View>
              <Title title="current posts to edit or delete them " />
            </View>
          </Text>
        </View>
        <View>
          <Text style={[{ top: 200 }]}>
            <View>
              <Title title="if you like" />
            </View>
          </Text>
        </View>
      </View>
    </View>
  );
}

export default Instruction;
