import React, { useCallback } from 'react';
import { View, FlatList, Text, ListRenderItem } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import styles from '../styles/chatListStyles';
import globalscreenstyles from '../common/global_ScreenStyles';
import { ChatType } from '../common/Types';
import { useChat } from '../common/ChatContext';

import TabBarTop from '../components/TabBarTop';
import TabBarBottom from '../components/TabBarBottom';
import HomeIcon from '../components/HomeIcon';
import CreateAdIcon from '../components/CreateAdIcon';
import AccountIcon from '../components/AccountIcon';
import GoBackIcon from '../components/GoBackIcon';
import ChatListItem from '../components/chatlist-utils/ChatListItem';
import ChatListEmptyComponent from '../components/chatlist-utils/ChatListEmpty';

const ChatList = ({ navigation }: { navigation: any }) => {
  const { your_id, chats, updateFocus } = useChat();
  const title = 'Messsages';
  const testID = 'title-test';

  // TS sucks
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
        return () => {};
    }, [])
  );

  useFocusEffect(
    useCallback(() => {
      updateFocus(true);
      
      return () => {
        updateFocus(false);
      };
    }, [updateFocus]),
  );

  const renderItem: ListRenderItem<ChatType> = ({ item }) => {
    return (
      <ChatListItem chat={item} navigation={navigation} your_id={your_id} />
    );
  };

  // temporary
  const keyExtractor = (item: ChatType) => `${item.username}-${item.adId}`;

  return (
    <SafeAreaView style={globalscreenstyles.container}>
      {/* Header */}
      <TabBarTop
        LeftIcon={<GoBackIcon />}
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
