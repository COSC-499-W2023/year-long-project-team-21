import React from 'react';
import { View, FlatList, Text, ListRenderItem, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../styles/chatListStyles';

import Header from '../components/UpperBar';
import TabBar from '../components/TabBar';
import Icon from '../components/Icon';

// import chatData from '../assets/chat_placeholder.json';
// import noData from '../assets/empty_chats.json';
// Page sends an error, because FlatList gets no data

type ChatType = {
  id: number;
  name: string;
  lastMessage: string;
  timestamp: string;
};

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

// EmptyListMessage component
// Bugged is added to the FlatList
const EmptyListMessage: React.FC = () => {
  return (
    <View style={styles.emptyListContainer}>
      <Text style={styles.emptyListText}>No messages yet.</Text>
    </View>
  );
};

const ChatList = () => {
  function handleLeftPress(): void {
    console.log('back pressed');
  }

  const renderItem: ListRenderItem<ChatType> = ({ item }) => (
    <ChatListItem chat={item} />
  );
  const keyExtractor = (item: ChatType) => item.id.toString();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Header
        onLeftPress={handleLeftPress}
        leftIconSource={require('../assets/back_arrow_white.png')}
        title="Messages"
      />

      {/* FlatList */}
      <FlatList
        data={}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        style={styles.listcontainer}
      />

      {/* TabBar */}
      <View style={styles.tabcontainer}>
        <TabBar
          LeftIcon={
            <Icon
              source={require('../assets/home-white.png')}
              size={40}
              onPress={() => console.log('home pressed')}
            />
          }
          RightIcon={
            <Icon
              source={require('../assets/profile-white.png')}
              size={40}
              onPress={() => console.log('profile pressed')}
            />
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default ChatList;
