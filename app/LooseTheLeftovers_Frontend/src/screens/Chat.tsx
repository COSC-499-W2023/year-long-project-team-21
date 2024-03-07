import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Bubble, GiftedChat, IMessage, InputToolbar, Send } from 'react-native-gifted-chat';
import { SafeAreaView, Text, View } from 'react-native';
import styles from '../styles/chatStyles';
import { global } from '../common/global_styles';
import globalscreenstyles from '../common/global_ScreenStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';

import TabBarTop from '../components/TabBarTop';
import GoBackIcon from '../components/GoBackIcon';

const Chat = ({ navigation, route }: { navigation: any; route: any }) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const { adId, username, title } = route.params;

  // Load messages from AsyncStorage
  const loadMessages = async () => {
    const chatKey = `chat_${adId}_${username}`;
    const storedMessages = await AsyncStorage.getItem(chatKey);
    console.log("Loaded messages:", storedMessages)
    if (storedMessages) setMessages(JSON.parse(storedMessages));
  };

  // Save messages to AsyncStorage
  const saveMessages = async () => {
    const chatKey = `chat_${adId}_${username}`;
    console.log("Saved messages:", messages)
    await AsyncStorage.setItem(chatKey, JSON.stringify(messages));
  };

  const messagesRef = useRef(messages);
  messagesRef.current = messages;

  useEffect(() => {
    loadMessages();

    return () => {
      // Use messagesRef.current to access the latest state
      const chatKey = `chat_${adId}_${username}`;
      console.log("Saved messages on cleanup:", messagesRef.current);
      AsyncStorage.setItem(chatKey, JSON.stringify(messagesRef.current));
    };
  }, []);

  const saveChatMetadata = async (adId: any, username: string, message: { text: string; createdAt: any; }) => {
    const key = `lastMsg-${adId}-${username}`;
    const value = JSON.stringify({
      adId,
      title,
      username,
      lastMessage: message.text,
      timestamp: message.createdAt,
    });

    console.log("Chat saves:", value)
  
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      console.error('Failed to save chat metadata:', e);
    }
  };

  const onSend = useCallback((newMessages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, newMessages),
    );
    // Call saveMessages to ensure the latest state is saved.
    saveMessages();
    // Ensure you use newMessages[0] to access the latest message sent.
    saveChatMetadata(adId, username, newMessages[0]);
  }, [adId, username]); // Depend on adId and username to capture latest changes.
  

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
      <TabBarTop
        LeftIcon={
          <GoBackIcon />
        }
        MiddleIcon={
          <Text style={styles.title}>
            {username}
          </Text>
        }
      />
      
      {/* Chat */}
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
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
