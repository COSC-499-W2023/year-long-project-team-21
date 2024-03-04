import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from '../../styles/chatListStyles';
import { ChatListItemProps } from '../../common/Types';

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

const ChatListItem: React.FC<ChatListItemProps> = ({ chat, onPress }) => {
  return (
    <TouchableOpacity
      onPress={() => onPress(chat.id)}
      style={styles.chatItem}
      testID="chatlist-item-test">
      <Text style={styles.chatItemName}>{chat.name}</Text>
      <Text style={styles.chatItemMessage}>{chat.lastMessage}</Text>
    </TouchableOpacity>
  );
};

export default ChatListItem;