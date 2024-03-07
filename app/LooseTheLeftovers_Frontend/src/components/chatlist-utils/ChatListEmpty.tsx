import React from 'react';
import { View, Text } from 'react-native';
import styles from '../../styles/chatListStyles';

const ChatListEmptyComponent = () => {
  return (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No messages so far!</Text>
    </View>
  );
};

export default ChatListEmptyComponent;
