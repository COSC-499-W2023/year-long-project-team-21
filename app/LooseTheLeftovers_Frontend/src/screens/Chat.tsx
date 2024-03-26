import React, { useCallback, useState, useEffect } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import {
  GiftedChat,
  IMessage,
  Bubble,
  InputToolbar,
  Send,
} from 'react-native-gifted-chat';
import styles from '../styles/chatStyles';
import { global } from '../common/global_styles';
import globalscreenstyles from '../common/global_ScreenStyles';
import ChatService from '../common/ChatService';

import TabBarTop from '../components/TabBarTop';
import GoBackIcon from '../components/GoBackIcon';
import { useFocusEffect } from '@react-navigation/native';

const Chat = ({ navigation, route }: { navigation: any; route: any }) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [lastMessages, setLastMessages] = useState<IMessage[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMorePages, setHasMorePages] = useState(true);
  const [username, setUsername] = useState('Messages');
  const [adTitle, setAdTitle] = useState('');
  const { ad_id, user_id, new_chat, your_id, title } = route.params;
  let tempMessages: any[] = [];

  const fetchUsernameForNewChat = async () => {
    try {
      const user = await ChatService.getUserById(user_id);
      if (user && user.username) {
        setUsername(user.username);
      }
    } catch (error) {
      console.error('Chat: Error fetching user details:', error);
    }
  };

  const formatMessages = (history: any[]) => {
    return history.map((msg) => {
      const createdAt = new Date(msg.time_sent);
      return {
        _id: msg.id,
        text: msg.msg,
        createdAt: createdAt,
        user: {
          _id: msg.sender_id,
        },
      };
    });
  };

  const sortMessagesByDate = (messages: any[]) => {
    return messages.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
    );
  };

  const updateMessages = (newMessages: React.SetStateAction<IMessage[]>) => {
    const newMessagesString = JSON.stringify(newMessages);
    const currentMessagesString = JSON.stringify(messages);
  
    if (newMessagesString !== currentMessagesString) {
      setMessages(newMessages);
    }
  };

  const removeDuplicates = (messages: IMessage[]): IMessage[] => {
    const unique: { [key: string]: IMessage } = {};
    messages.forEach((msg) => {
      unique[msg._id] = msg;
    });
    return Object.values(unique);
  };

  const fetchAllMessages = async (currentPage: number) => {
    try {
      const response = await ChatService.fetchChatUpdates(user_id, ad_id, currentPage);

      if (response.data && response.data.length > 0) {
        const newMessages = formatMessages(response.data);
        tempMessages = [...tempMessages, ...newMessages];
      }

      if (response.data.length < 6 || response.status === 204) {
        setHasMorePages(false);
        
        const uniqueMessages = removeDuplicates(tempMessages);
        const sortedMessages = sortMessagesByDate(uniqueMessages);
        
        setMessages(sortedMessages);
        setLastMessages(sortedMessages.slice(Math.max(sortedMessages.length - 6, 0)));
        tempMessages = [];
        return;
      } else {
        console.log('Chat: page', currentPage + 1);
        fetchAllMessages(currentPage + 1);
      }
    } catch (error) {
      console.error('Error fetching chat messages:', error);
    }
  };

  useEffect(() => {
    console.log('Recent 6:', lastMessages);
  }, [lastMessages]);  

  const fetchHistory = async () => {
    try {
      const history = await ChatService.fetchChatUpdates(user_id, ad_id);
      console.log('Chat: history length:', history.length);
      const receiverUsername = history[0]?.username;
      setUsername(receiverUsername);
  
      // Format
      const formattedMessages = formatMessages(history);

      // Sort
      const sortedMessages = sortMessagesByDate(formattedMessages);

      // Update
      updateMessages(sortedMessages);
    } catch (error) {
      console.error('Chat: Error fetching chat history:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      // Navigated from View_Post
      if (typeof title !== 'undefined') {
        setAdTitle(title);
      }
  
      // Fetch history for existing chat
      if (!new_chat) {
        fetchAllMessages(1);
        // const intervalId = setInterval(fetchHistory, 15000); // 15 seconds interval
        // return () => clearInterval(intervalId); // Clear interval on blur or component unmount
      } else {
        // Fetch username for new chat
        fetchUsernameForNewChat();
      }
    }, [])
  );

  const onSend = useCallback(
    (messages: IMessage[] = []) => {
      messages.forEach(async message => {
        try {
          await ChatService.sendMessage(user_id, ad_id, message.text);
        } catch (error) {
          console.error('Chat: Failed to send message:', error);
        }
      });
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, messages),
      );
    },
    [ad_id, user_id],
  );

  const renderBubble = (props: any) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: global.primary,
          },
          left: {
            backgroundColor: global.secondary,
          },
        }}
      />
    );
  };

  const renderInputToolbar = (props: any) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          backgroundColor: global.tertiary,
        }}
      />
    );
  };

  const renderSend = (props: any) => {
    return (
      <Send {...props}>
        <View style={{ marginRight: 10, marginBottom: 5 }}>
          <Text style={{ fontSize: 18, color: global.primary }}>Send</Text>
        </View>
      </Send>
    );
  };

  return (
    <SafeAreaView style={globalscreenstyles.container}>
      {/* Header */}
      <View style={styles.tabBarTopWrapper}>
        <TabBarTop
          LeftIcon={<GoBackIcon />}
          MiddleIcon={<Text style={styles.title}>{`${username}${adTitle ? `, ${adTitle}` : ''}`}</Text>}
        />
      </View>

      {/* Chat */}
      <GiftedChat
        messages={messages}
        onSend={(messages: IMessage[]) => onSend(messages)}
        user={{
          _id: your_id,
        }}
        renderAvatar={null}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        renderSend={renderSend}
      />
    </SafeAreaView>
  );
};

export default Chat;
