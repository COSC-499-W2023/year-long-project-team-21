import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import { ChatType, ChatContextType } from './Types';
import ChatService from '../common/ChatService';
import { retrieveUserSession } from '../common/EncryptedSession';

const ChatContext = createContext<ChatContextType>({} as ChatContextType);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [your_id, setYourId] = useState(null);
  const [chats, setChats] = useState<ChatType[]>([]);
  const [inFocus, setInFocus] = useState(false);

  /**
   * Sets or removes `your_id` depending on logged in/out state.
   */
  useEffect(() => {
    if (loggedIn) {
      getUserId();
      console.log('ChatContext: Logged in, your_id:', your_id);
    }

    if (!loggedIn) {
      setYourId(null);
      console.log('ChatContext: Logged out, your_id:', your_id);
    }
  }, [loggedIn]);

  /**
   * Sets fetch interval depending on ChatList focus, resets chats to empty array on log out.
   */
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    const fetchInterval = inFocus ? 10000 : 120000; // 10 second or 2 minute interval

    if (loggedIn) {
      console.log('ChatContext: inFocus:', inFocus);
      fetchAndSetChats();
      interval = setInterval(fetchAndSetChats, fetchInterval);
    } else {
      setChats([]);
      console.log('ChatContext: Logged out, chats reset');
    }

    return () => {
      if (interval) clearInterval(interval); // Clean up on unmount, or loggedIn / inFocus changes
    };
  }, [loggedIn, inFocus]);

  /**
   * Updates logged in state.
   *
   * @param {string} value - Logged in update boolean.
   */
  const updateLoggedIn = (value: boolean) => {
    setLoggedIn(value);
  };

  /**
   * Updates ChatList in focus state.
   *
   * @param {string} value - In focus update boolean.
   */
  const updateFocus = (value: boolean) => {
    setInFocus(value);
  };

  /**
   * Gets user id from current session.
   */
  const getUserId = async () => {
    const session = await retrieveUserSession();
    if (session && session.user_id) {
      setYourId(session.user_id);
    }
  };

  /**
   * Fetches last messages, sorts by time, and compares to prev set.
   */
  const fetchAndSetChats = async () => {
    try {
      const lastMessages = await ChatService.getLastMessage();
      const sortedChats = sortChatsByTime(lastMessages);

      // Compare incoming data to local, update if not the same
      if (!areChatsEqual(chats, sortedChats)) {
        setChats(sortedChats);
        console.log('ChatContext: updated chats:', sortedChats);
      }
    } catch (error) {
      console.error('ChatList: Error fetching last messages:', error);
    }
  };

  /**
   * Sorts array of messages by time_sent and transforms into correct format.
   *
   * @param {Array<{ user_id: string | number; ad_id: string | number; username?: string; msg?: string; time_sent: Date; }>} chats
   * @returns {Array<{ id: string; user_id: number; ad_id: number; username: string; msg: string; time_sent: string; }>}
   */
  const sortChatsByTime = (chats: Array<any>) => {
    return chats
      .map(chat => ({
        ...chat,
        id: `${chat.user_id}_${chat.ad_id}`,
        username: chat.username || 'Unknown',
        msg: chat.msg || '',
        time_sent: new Date(chat.time_sent).toISOString(),
        user_id: Number(chat.user_id),
        ad_id: Number(chat.ad_id),
      }))
      .sort(
        (a, b) =>
          new Date(b.time_sent).getTime() - new Date(a.time_sent).getTime(),
      );
  };

  /**
   * Compares local and newly fetched chats by number and timestamp.
   *
   * @param {string | any[]} currentChats - Local stored messages.
   * @param {string | any[]} newChats - Newly fetched messages.
   * @returns {boolean} - Boolean whether chats are the same.
   */
  const areChatsEqual = (
    currentChats: string | any[],
    newChats: string | any[],
  ) => {
    if (currentChats.length !== newChats.length) return false;

    for (let i = 0; i < currentChats.length; i++) {
      if (currentChats[i].time_sent !== newChats[i].time_sent) return false;
    }
    return true;
  };

  return (
    <ChatContext.Provider
      value={{
        your_id,
        chats,
        loggedIn,
        updateLoggedIn,
        updateFocus,
      }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
