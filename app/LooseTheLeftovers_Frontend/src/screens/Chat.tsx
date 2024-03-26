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

        const receiverUsername = response.data[0]?.username;
        setUsername(receiverUsername);
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
        fetchAllMessages(currentPage + 1);
      }
    } catch (error) {
      console.error('Error fetching chat messages:', error);
    }
  };

  useEffect(() => {
    console.log('Recent 6:', lastMessages);
  }, [lastMessages]);

  const areMessagesEqual = (messagesA: string | any[], messagesB: string | any[]) => {
    // Check if both the same length
    if (messagesA.length !== messagesB.length) {
      return false;
    }
  
    // Compare each message in the arrays
    for (let i = 0; i < messagesA.length; i++) {
      // Compare the unique id of each message
      if (messagesA[i]._id !== messagesB[i]._id) {
        return false; // Found a mismatch
      }
    }
  
    // All match
    return true;
  };

  const fetchPageOne = async () => {
    try {
      const response = await ChatService.fetchChatUpdates(user_id, ad_id, 1);
      
      const newMessages = formatMessages(response.data);
      const uniqueMessages = removeDuplicates([...newMessages, ...tempMessages]);
      const sortedMessages = sortMessagesByDate(uniqueMessages);
  
      const lastFetchedMessages = sortedMessages.slice(Math.max(sortedMessages.length - 6, 0));
      if (!areMessagesEqual(lastFetchedMessages, lastMessages)) {
        setMessages((currentMessages) => {
          const combinedMessages = [...currentMessages, ...newMessages];
          const uniqueMessages = removeDuplicates(combinedMessages);
          return sortMessagesByDate(uniqueMessages);
        });
        setLastMessages(lastFetchedMessages);
      }
    } catch (error) {
      console.error('Error fetching page 1:', error);
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
        const intervalId = setInterval(fetchPageOne, 5000); // 15 seconds interval
        return () => clearInterval(intervalId); // Clear interval on blur or component unmount
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
          _id: your_id.current,
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
