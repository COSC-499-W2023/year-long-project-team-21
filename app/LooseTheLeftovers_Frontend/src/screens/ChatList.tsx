import React, { useCallback, useEffect, useState } from 'react';
import { View, FlatList, Text, ListRenderItem } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import styles from '../styles/chatListStyles';
import globalscreenstyles from '../common/global_ScreenStyles';
import { ChatType } from '../common/Types';
import { retrieveUserSession } from '../common/EncryptedSession';
import ChatService from '../common/ChatService';

import TabBarTop from '../components/TabBarTop';
import TabBarBottom from '../components/TabBarBottom';
import HomeIcon from '../components/HomeIcon';
import CreateAdIcon from '../components/CreateAdIcon';
import AccountIcon from '../components/AccountIcon';
import GoBackIcon from '../components/GoBackIcon';
import ChatListItem from '../components/chatlist-utils/ChatListItem';
import ChatListEmptyComponent from '../components/chatlist-utils/ChatListEmpty';

const ChatList = ({ navigation }: { navigation: any }) => {
  const [chats, setChats] = useState<ChatType[]>([]);
  const [your_id, setCurrentUserId] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  const title = 'Messsages';
  const testID = 'title-test';

  useEffect(() => {
    const getSessionAndSetUserId = async () => {
      const session = await retrieveUserSession();
      if (session && session.user_id) {
        setCurrentUserId(session.user_id);
      }
    };
  
    getSessionAndSetUserId();
  }, []);

  const fetchAndSetChats = async () => {
    try {
      const lastMessages = await ChatService.getLastMessage();
      const chatsWithUniqueId = lastMessages.map((chat: { user_id: any; ad_id: any; }) => ({
        ...chat,
        id: `${chat.user_id}_${chat.ad_id}`,
      }))
      .sort((a: { time_sent: Date; }, b: { time_sent: Date; }) => new Date(b.time_sent).getTime() - new Date(a.time_sent).getTime());

      // Compare fetched chats with the current state to decide on re-rendering
      if (!areChatsEqual(chats, chatsWithUniqueId)) {
        setChats(chatsWithUniqueId);
      }
    } catch (error) {
      console.error('ChatList: Error fetching last messages:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setIsFocused(true);
      fetchAndSetChats(); // Initial fetch

      const interval = setInterval(fetchAndSetChats, 15000); // 15-second interval

      return () => {
        clearInterval(interval); // Clear interval on blur
        setIsFocused(false);
      };
    }, [])
  );

  useEffect(() => {
    if (!isFocused) {
      // When not in focus, fetch every 5 minutes
      const interval = setInterval(fetchAndSetChats, 300000); // 5-minute interval
      return () => clearInterval(interval);
    }
  }, [isFocused]);

  const areChatsEqual = (currentChats: string | any[], newChats: string | any[]) => {
    if (currentChats.length !== newChats.length) return false;

    for (let i = 0; i < currentChats.length; i++) {
      if (currentChats[i].time_sent !== newChats[i].time_sent) return false;
    }

    return true;
  };

  const renderItem: ListRenderItem<ChatType> = ({ item }) => {
    return (
      <ChatListItem chat={item} navigation={navigation} your_id={your_id} />
    );
  };

  const keyExtractor = (item: ChatType) => item.id.toString();

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
