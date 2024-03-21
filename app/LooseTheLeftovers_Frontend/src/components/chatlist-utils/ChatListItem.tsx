import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { formatDistanceToNow, parseISO } from 'date-fns';
import styles from '../../styles/chatListStyles';

/**
 * ChatListItem component.
 *
 * A list item component for displaying a single chat in a list. Shows the chat's name and
 * the last message sent. When pressed, triggers an action defined by the `onPress` prop,
 * in the fututre to navigate to the Chat screen.
 *
 * @component
 * @example
 * return (
 *   <ChatListItem
 *     chat={{
 *       id: '1',
 *       name: 'John Doe',
 *       lastMessage: 'Hey, how are you?',
 *     }}
 *     onPress={handlePress}
 *   />
 * )
 */

const ChatListItem: React.FC<{
  chat: {
    id: string;
    user_id: number;
    ad_id: number;
    msg: string;
    time_sent: string;
    username: string;
  };
  navigation: any;
  your_id: any;
}> = ({ chat, navigation, your_id }) => {
  const handlePress = () => {
    navigation.navigate('Chat', {
      user_id: chat.user_id,
      ad_id: chat.ad_id,
      your_id: your_id,
      new_chat: false,
    });
  };

  const lastMessageTime = formatDistanceToNow(parseISO(chat.time_sent), {
    addSuffix: true,
  });

  return (
    <TouchableOpacity onPress={handlePress} style={styles.chatItem}>
      <View style={styles.chatItemHeader}>
        <Text style={styles.chatItemName}>{chat.username + " ad:" + chat.ad_id}</Text>
        <Text style={styles.chatItemTime}>{lastMessageTime}</Text>
      </View>
      <Text style={styles.chatItemMessage}>{chat.msg}</Text>
    </TouchableOpacity>
  );
};

export default ChatListItem;
