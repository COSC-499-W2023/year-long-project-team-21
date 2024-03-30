import React, { useCallback, useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
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

const Chat = ({ navigation, route }: { navigation: any; route: any }) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [lastMessages, setLastMessages] = useState<IMessage[]>([]);
  const [hasMorePages, setHasMorePages] = useState(true);
  const [username, setUsername] = useState('Messages');
  const [adTitle, setAdTitle] = useState('');
  const { ad_id, user_id, new_chat, your_id, title } = route.params;
  let tempMessages: any[] = [];

  /**
   * @useFocusEffect
   * @description This effect handles the initialization logic when the chat screen gains focus. For new chats, it 
   * fetches the username of the chat partner. For existing chats, it fetches the entire chat history, and sets up 
   * a regular interval to fetch the most recent messages, ensuring the chat stays updated. The interval is cleared
   * when the component loses focus or is unmounted, ensuring updates are only fetched when the chat is in focus.
   */
  useFocusEffect(
    useCallback(() => {
      // If navigated from View_Post, get title from route.params
      if (typeof title !== 'undefined') {
        setAdTitle(title);
      }

      // Fetch history for existing chat
      if (!new_chat) {
        fetchAllMessages(1);
        const intervalId = setInterval(fetchPageOne, 5000); // Fetch page 1 every 5 seconds
        return () => clearInterval(intervalId); // Clear interval on blur or unmount
      } else {
        // Fetch username for new chat
        fetchUsernameForNewChat();
      }
    }, []),
  );

  /**
   * @function fetchUsernameForNewChat
   * @description Fetches the username in a new chat where no messages have been exchanged yet.
   * This is necessary because, for existing chats, username is extracted from the first message.
   * In the case of a new chat without any messages, this function directly fetches the username
   * from the user service. If the user is found and a username exists, it updates the chat's state to
   * display the correct username.
   */
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

  /**
   * @function formatMessages
   * @description Transforms raw message data received from the backend into a format compatible with GiftedChat.
   * The process includes reformatting the timestamp and structuring the message objects according
   * to GiftedChat's expected properties. Each message's unique identifier, text content, creation timestamp,
   * and sender's identifier are preserved and mapped to the properties in the GiftedChat format.
   *
   * @param {Array<Object>} history - An array of message objects fetched from the backend, where each object
   * contains information about a single message, including its id, text content, timestamp, and sender's ID.
   * @returns {Array<Object>} An array of message objects formatted for display within the GiftedChat component,
   * with each object adhering to the structure required by GiftedChat (`_id`, `text`, `createdAt`, and `user`).
   */
  const formatMessages = (history: any[]) => {
    return history.map(msg => {
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

  /**
   * @function sortMessagesByDate
   * @description Sorts an array of message objects by their creation date in descending order. Ensures the most
   * recent messages appear first in the list. Based on the `createdAt` property of each message object, which is 
   * expected to be a Date instance.
   *
   * @param {Array<Object>} messages - An array of message objects to be sorted. Each message object must include
   * a `createdAt` property that is a Date instance.
   * @returns {Array<Object>} A new array of message objects sorted by their `createdAt` timestamps in descending order,
   * with the most recent message appearing first.
   */
  const sortMessagesByDate = (messages: any[]) => {
    return messages.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
    );
  };

  /**
   * @function removeDuplicates
   * @description Removes duplicate messages based on their unique _id. Creates a new array that only includes 
   * one instance of each message, identified by unique ids. It's an additional precaution, even though the backend is
   * expected to enforce unique IDs for each message.
   *
   * @param {Array<IMessage>} messages - An array of message objects that potentially contains duplicates.
   * Each message object is expected to have a unique `_id`.
   * @returns {Array<IMessage>} A new array of message objects where each message has a unique `_id`,
   * removing any duplicates that were present in the input array.
   */
  const removeDuplicates = (messages: IMessage[]): IMessage[] => {
    const unique: { [key: string]: IMessage } = {};
    messages.forEach(msg => {
      unique[msg._id] = msg;
    });
    return Object.values(unique);
  };

  /**
   * @function areMessagesEqual
   * @description Compares two arrays of message objects to determine if they are identical. Based
   * on the `_id` of each message. Typically used to compare the most recent messages fetched against 
   * the most recent local messages, to decide whether the chat's state needs updating. Equality is determined by
   * the same length of both arrays and each corresponding message having matching `_id`s.
   *
   * @param {Array<Object> | string} messagesA - The first array of message objects to be compared.
   * @param {Array<Object> | string} messagesB - The second array of message objects to be compared.
   * @returns {boolean} - Returns `true` if both message arrays are of the same length and contain messages
   * with matching `_id`s at each index. Otherwise, returns `false`.
   */
  const areMessagesEqual = (
    messagesA: string | any[],
    messagesB: string | any[],
  ) => {
    // Check length
    if (messagesA.length !== messagesB.length) {
      return false;
    }
    // Compare each message
    for (let i = 0; i < messagesA.length; i++) {
      // Compare id of each message
      if (messagesA[i]._id !== messagesB[i]._id) {
        return false;
      }
    }
    return true;
  };

  /**
   * @function fetchAllMessages
   * @description Fetches the entire chat history. Invoked when the chat component comes into focus.
   * Accumulates messages from each page into a temporary array, `tempMessages`, applying deduplication and sorting 
   * before updating the chat state. Goes on recursively until all pages have been fetched or a page with fewer than 6 
   * messages (or no messages) is encountered. Additionally, the function updates the interface to display the username 
   * of the receiver if the chat is not new.
   *
   * @param {number} currentPage - The current page number to fetch from the server, starting from 1. Increments with each 
   * recursive call until the chat history is fully loaded or the end of history is indicated by the server response 204.
   */
  const fetchAllMessages = async (currentPage: number) => {
    try {
      const response = await ChatService.fetchChatUpdates(
        user_id,
        ad_id,
        currentPage,
      );

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
        setLastMessages(
          sortedMessages.slice(Math.max(sortedMessages.length - 6, 0)),
        );
        tempMessages = [];
        return;
      } else {
        fetchAllMessages(currentPage + 1);
      }
    } catch (error) {
      console.error('Error fetching chat messages:', error);
    }
  };

  /**
   * @function fetchPageOne
   * @description Fetches the 6 most recent messages from the server, to ensure the chat history is up to date. 
   * Triggered at regular intervals after the initial complete chat history has been loaded. Compares the newly fetched
   *  messages against the currently known last 6 messages to determine if there are any new updates. If new messages 
   * are found, they are merged into the existing chat history, maintaining uniqueness and chronological order. Imitates 
   * real time updates.
   *
   * The comparison with the local last six messages serves to minimize unnecessary updates to the chat
   * state, updating only when new messages are detected.
   */
  const fetchPageOne = async () => {
    try {
      const response = await ChatService.fetchChatUpdates(user_id, ad_id, 1);

      const newMessages = formatMessages(response.data);
      const uniqueMessages = removeDuplicates([
        ...newMessages,
        ...tempMessages,
      ]);
      const sortedMessages = sortMessagesByDate(uniqueMessages);

      const lastFetchedMessages = sortedMessages.slice(
        Math.max(sortedMessages.length - 6, 0),
      );
      if (!areMessagesEqual(lastFetchedMessages, lastMessages)) {
        setMessages(currentMessages => {
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

  /**
   * @function onSend
   * @description Handles sending a new message in the chat. Each message provided in the
   * `messages` array is sent individually to the server using ChatService. After successfully sending
   * a message, immediately fetches the first page of the history to display the newly sent message,
   * ensuring the chat view is updated.
   *
   * Designed to work with arrays of messages, accommodating the potential for sending
   * multiple messages simultaneously, although typically it will be used to send single messages.
   *
   * @param {Array<IMessage>} messages - An array of message objects to be sent. Each object includes 
   * `message.text`, receiver's id (`user_id`), and `ad_id`.
   */
  const onSend = useCallback(
    (messages: IMessage[] = []) => {
      messages.forEach(async message => {
        try {
          await ChatService.sendMessage(user_id, ad_id, message.text);
          fetchPageOne();
        } catch (error) {
          console.error('Chat: Failed to send message:', error);
        }
      });
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
          MiddleIcon={
            <Text style={styles.title}>{`${username}${adTitle ? `, ${adTitle}` : ''}`}</Text>
          }
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
