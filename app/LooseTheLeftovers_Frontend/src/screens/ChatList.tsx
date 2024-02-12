import React from 'react';
import {
  View,
  FlatList,
  Text,
  ListRenderItem,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../styles/chatListStyles';
import globalscreenstyles from '../common/global_ScreenStyles';
import { ChatType } from '../common/Types';

import TabBarTop from '../components/TabBarTop';
import TabBarBottom from '../components/TabBarBottom';
import Icon from '../components/Icon';
import HomeIcon from '../components/HomeIcon';
import CreateAdIcon from '../components/CreateAdIcon';
import AccountIcon from '../components/AccountIcon';

import chatData from '../assets/dummy_chats.json';
// Page sends an error if FlatList gets no data

// ChatListItem component
const ChatListItem: React.FC<{ chat: ChatType }> = ({ chat }) => {
  const handleChatPress = () => {
    console.log('Pressed chat:', chat.id);
  };

  return (
    <TouchableOpacity onPress={handleChatPress} style={styles.chatItem}>
      <Text style={styles.chatItemName}>{chat.name}</Text>
      <Text style={styles.chatItemMessage}>{chat.lastMessage}</Text>
    </TouchableOpacity>
  );
};

const ChatList = ({ navigation }: { navigation: any }) => {
  const title = 'Messsages';
  const testID = 'title-test';

  // To be replaced with 'Back' button
  function handleLeftPress(): void {
    navigation.goBack();
  }

  const renderItem: ListRenderItem<ChatType> = ({ item }) => (
    <ChatListItem chat={item} />
  );
  const keyExtractor = (item: ChatType) => item.id.toString();

  return (
    <SafeAreaView style={globalscreenstyles.container}>
      {/* Header */}
      <TabBarTop
        LeftIcon={
          <Icon
            source={require('../assets/back_arrow_white.png')}
            onPress={handleLeftPress}
          />
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
