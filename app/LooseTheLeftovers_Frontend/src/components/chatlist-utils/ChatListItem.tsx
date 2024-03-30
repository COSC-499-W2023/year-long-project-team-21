import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { formatDistanceToNow, parseISO } from 'date-fns';
import ChatService from '../../common/ChatService';
import styles from '../../styles/chatListStyles';

/**
 * ChatListItem component.
 *
 * A list item component for displaying a single chat in a list. Shows the chat's name,
 * the last message sent, and when the last message was sent/received. When pressed,
 * navigates to respective Chat.
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
  const [title, setTitle] = useState<string>('loading title...');

  useEffect(() => {
    const fetchAdTitle = async () => {
      try {
        const title = await ChatService.getAdTitle(chat.ad_id);
        setTitle(title);
      } catch (error) {
        console.error('ChatListItem: Error fetching ad title:', error);
        setTitle('unavailable');
      }
    };

    fetchAdTitle();
  }, [chat.ad_id]);

  const handlePress = () => {
    navigation.navigate('Chat', {
      user_id: chat.user_id,
      ad_id: chat.ad_id,
      title: title,
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
        <Text style={styles.chatItemName}>{`${chat.username} — ${title}`}</Text>
        <Text style={styles.chatItemTime}>{lastMessageTime}</Text>
      </View>
      <Text style={styles.chatItemMessage}>{chat.msg}</Text>
    </TouchableOpacity>
  );
};

export default ChatListItem;
