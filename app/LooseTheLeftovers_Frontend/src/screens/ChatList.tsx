import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, ListRenderItem } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../styles/chatListStyles';
import globalscreenstyles from '../common/global_ScreenStyles';
import { ChatType } from '../common/Types';
import ChatService from '../common/ChatService';

import TabBarTop from '../components/TabBarTop';
import TabBarBottom from '../components/TabBarBottom';
import HomeIcon from '../components/HomeIcon';
import CreateAdIcon from '../components/CreateAdIcon';
import AccountIcon from '../components/AccountIcon';
import ChatListItem from '../components/chatlist-utils/ChatListItem';
import ChatListEmptyComponent from '../components/chatlist-utils/ChatListEmpty';

import chatData from '../assets/dummy_chats.json';

const ChatList = ({ navigation }: { navigation: any }) => {
  const [chats, setChats] = useState<ChatType[]>([]);
  const isFocused = useIsFocused();
  
  const title = 'Messsages';
  const testID = 'title-test';

  useEffect(() => {
    if (isFocused) {
      const fetchChats = async () => {
        try {
          const lastMessages = await ChatService.fetchLastMessage();
          console.log('Fetched chats:', lastMessages);
          setChats(lastMessages);
        } catch (error) {
          console.error('Error fetching chats:', error);
        }
      };
      fetchChats();
    }
  }, [isFocused]);

  const renderItem: ListRenderItem<ChatType> = ({ item }) => (
    <ChatListItem
      chat={item}
      onPress={chatId => {
        console.log('Pressed chat:', chatId);
      }}
      navigation={navigation}
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
          ListEmptyComponent={ChatListEmptyComponent}
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
