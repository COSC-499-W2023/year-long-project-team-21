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

  const keyExtractor = (item: ChatType) => item.id.toString();

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
