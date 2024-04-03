import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';
import { formatDistanceToNow, parseISO } from 'date-fns';
import ChatService from '../../common/ChatService';
import { useChat } from '../../common/ChatContext';
import { global } from '../../common/global_styles';
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
    read: boolean;
  };
  navigation: any;
  your_id: any;
}> = ({ chat, navigation, your_id }) => {
  const [title, setTitle] = useState<string>('loading title...');
  const { markChatAsReadById } = useChat();

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
    if (!chat.read) markChatAsReadById(chat.id);

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
      {!chat.read ? (
        <View style={styles.unreadContainer}>
          <Text style={styles.chatItemMessageUnread}>{chat.msg}</Text>
          <Icon name="dot-fill" size={20} style={[{ color: global.primary }]} />
        </View>
      ) : (
        <Text style={styles.chatItemMessage}>{chat.msg}</Text>
      )}
    </TouchableOpacity>
  );
};

export default ChatListItem;
