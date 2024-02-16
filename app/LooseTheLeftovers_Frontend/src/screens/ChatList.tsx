import React from 'react';
import {
  View,
  FlatList,
  Text,
  ListRenderItem,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../styles/chatListStyles';
import globalscreenstyles from '../common/global_ScreenStyles';
import { ChatType } from '../common/Types';

import TabBarTop from '../components/TabBarTop';
import TabBarBottom from '../components/TabBarBottom';
import HomeIcon from '../components/HomeIcon';
import CreateAdIcon from '../components/CreateAdIcon';
import AccountIcon from '../components/AccountIcon';
import ChatListItem from '../components/ChatListItem';

import chatData from '../assets/dummy_chats.json';
// Page sends an error if FlatList gets no data

const ChatList = ({ navigation }: { navigation: any }) => {
  const title = 'Messsages';
  const testID = 'title-test';

  const renderItem: ListRenderItem<ChatType> = ({ item }) => (
    <ChatListItem 
      chat={item} 
      onPress={(chatId) => {
        console.log('Pressed chat:', chatId);
      }}
    />
  );
  
  const keyExtractor = (item: ChatType) => item.id.toString();

  return (
    <SafeAreaView style={globalscreenstyles.container}>
      {/* Header */}
      <TabBarTop
        MiddleIcon={
          <Text style={styles.title} testID={testID}>
            {title}
          </Text>
        }
      />

      {/* FlatList */}
      <View style={globalscreenstyles.middle}>
        <FlatList
          data={chatData}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      </View>

      {/* TabBar */}
      <TabBarBottom
        LeftIcon={<HomeIcon />}
        MiddleIcon={<CreateAdIcon />}
        RightIcon={<AccountIcon />}
      />
    </SafeAreaView>
  );
};

export default ChatList;
