import React from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { global } from '../common/global_styles';
import styles from '../styles/chatListStyles';

import Header from '../components/UpperBar';
import TabBar from '../components/TabBar';
import Icon from '../components/Icon';


const ChatList = () => {
    function handleLeftPress(): void { console.log('pressed home'); }

  return (
    <SafeAreaView style={styles.container}>
        {/* Header */}
        <Header
            onLeftPress={handleLeftPress}
            leftIconSource={require('../assets/back_arrow_white.png')}
            title='Messages'
        />

        <ScrollView style={styles.container}>
            <View></View>
        </ScrollView>

        {/* TabBar */}
        <View style={styles.tabcontainer}>
            <TabBar
                LeftIcon={<Icon source={require('../assets/home-white.png')} size={40} onPress={() => console.log('home pressed')} />}
                RightIcon={<Icon source={require('../assets/profile-white.png')} size={40} onPress={() => console.log('profile pressed')} />}
            />
        </View>
    </SafeAreaView>
  );
};

export default ChatList;
