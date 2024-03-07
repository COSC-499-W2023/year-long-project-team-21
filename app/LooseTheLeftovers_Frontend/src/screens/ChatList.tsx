import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, ListRenderItem } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../styles/chatListStyles';
import globalscreenstyles from '../common/global_ScreenStyles';
import { ChatType } from '../common/Types';

import TabBarTop from '../components/TabBarTop';
import TabBarBottom from '../components/TabBarBottom';
import HomeIcon from '../components/HomeIcon';
import CreateAdIcon from '../components/CreateAdIcon';
import AccountIcon from '../components/AccountIcon';
import ChatListItem from '../components/chatlist-utils/ChatListItem';
import ChatListEmptyComponent from '../components/chatlist-utils/ChatListEmpty';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GoBackIcon from '../components/GoBackIcon';
import { useFocusEffect } from '@react-navigation/native';

const ChatList = ({ navigation }: { navigation: any }) => {
  const [chats, setChats] = useState<ChatType[]>([]);

  const title = 'Messages';
  const testID = 'title-test';

  const loadChatMetadata = async () => {
    let keys = [];
    try {
      keys = await AsyncStorage.getAllKeys();
  
      const lastMsgKeys = keys.filter(key => key.startsWith('lastMsg-'));
      const stores = await AsyncStorage.multiGet(lastMsgKeys);
      const chatsWithPossibleDuplicates = stores.map((result, i, store) => {
        let key = store[i][0];
        let value = JSON.parse(store[i][1]);
        return {
          key,
          adId: value.adId,
          username: value.username,
          lastMessage: value.lastMessage,
          timestamp: value.timestamp,
        };
      });
  
      // Filter out duplicate keys
      const chats = chatsWithPossibleDuplicates.reduce((acc, current) => {
        if (!acc.some(chat => chat.key === current.key)) {
          acc.push(current);
        }
        return acc;
      }, []);
  
      // Now setChats with this data or return it
      return chats;
    } catch (e) {
      console.error('Failed to load chat metadata:', e);
      return [];
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        const chats = await loadChatMetadata();
        setChats(chats);
      };
  
      fetchData();
  
      // No cleanup action needed, but you could return a cleanup function if necessary
      return () => {};
    }, []) // Dependency array can be left empty or include variables that on change, should trigger the effect
  );

  const renderItem: ListRenderItem<ChatType> = ({ item }) => (
    <ChatListItem
      chat={item}
      onPress={chatId => {
        console.log('Pressed chat:', chatId);
      }}
      navigation={navigation}
    />
  );

  // temporary, waiting for backend
  const keyExtractor = (item: ChatType) => `${item.username}-${item.adId}`;

  return (
    <SafeAreaView style={globalscreenstyles.container}>
      {/* Header */}
      <TabBarTop
        LeftIcon={
          <GoBackIcon />
        }
        MiddleIcon={
          <Text style={styles.title} testID={testID}>
            {title}
          </Text>
        }
      />

      {/* FlatList */}
      <View style={globalscreenstyles.middle}>
        <FlatList
          data={chats}
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
