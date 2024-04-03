import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useRef,
} from 'react';
import { ChatType, ChatContextType } from './Types';
import ChatService from './ChatService';
import { retrieveUserSession } from './EncryptedSession';

const ChatContext = createContext<ChatContextType>({} as ChatContextType);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [your_id, setYourId] = useState(null);
  const [chats, setChats] = useState<ChatType[]>([]);
  const [inFocus, setInFocus] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const firstFetch = useRef(true);
  const unread = useRef(0);

  /**
   * Sets or removes `your_id` depending on logged in/out state.
   */
  useEffect(() => {
    if (loggedIn) {
      getUserId();
    } else {
      setYourId(null);
    }
  }, [loggedIn]);

  /**
   * Sets fetch interval depending on ChatList focus, resets chats to empty array on log out.
   */
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    const fetchInterval = inFocus ? 10000 : 20000; // 10 second or 2 minute interval

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
      console.log('ChatContext: firstFetch:', firstFetch.current);
      const lastMessages = await ChatService.getLastMessage();
      const formattedChats = formatChats(lastMessages);

      // Use areChatsEqual for a quick preliminary check
      if (!areChatsEqual(chats, formattedChats)) {
        updateChatsAndUnreadStatus(chats, formattedChats);
      } else if (!firstFetch.current) {
        updateChatsAndUnreadStatus(chats, formattedChats);
      }

      console.log('ChatContext: updated chats:', formattedChats);
    } catch (error) {
      console.error('ChatList: Error fetching last messages:', error);
    }

    if (firstFetch.current) firstFetch.current = false;
  };

  /**
   * Sorts array of messages by time_sent and transforms into correct format.
   *
   * @param {Array<{ user_id: number; ad_id: number; username?: string; msg?: string; time_sent: Date; }>} chats
   * @returns {Array<{ id: string; user_id: number; ad_id: number; username: string; msg: string; time_sent: Date; }>}
   */
  const formatChats = (fetchedChats: Array<any>) => {
    const currentChatsMap = new Map(
      chats.map(chat => [
        chat.id,
        { read: chat.read, time_sent: chat.time_sent },
      ]),
    );

    return fetchedChats
      .map(chat => {
        const chatId = `${chat.user_id}_${chat.ad_id}`;
        const existingChat = currentChatsMap.get(chatId);
        let readStatus;

        if (firstFetch.current) {
          readStatus = true; // All messages are marked as read on the first fetch
        } else {
          // For subsequent updates, preserve read status for existing chats, default to false for new messages
          readStatus = existingChat ? existingChat.read : false;
        }

        // Update logic to account for the case where a chat is existing but has a new message
        if (
          existingChat &&
          new Date(chat.time_sent).toISOString() !== existingChat.time_sent
        ) {
          readStatus = false; // New message in an existing chat
          setHasUnread(true);
          unread.current += 1;
        }

        return {
          ...chat,
          id: chatId,
          username: chat.username || 'Unknown',
          msg: chat.msg || '',
          time_sent: new Date(chat.time_sent).toISOString(),
          user_id: Number(chat.user_id),
          ad_id: Number(chat.ad_id),
          read: readStatus,
        };
      })
      .sort(
        (a, b) =>
          new Date(b.time_sent).getTime() - new Date(a.time_sent).getTime(),
      );
  };

  /**
   * Compares local and newly fetched chats by id and time_sent.
   *
   * @param {ChatType[]} currentChats - Local stored messages.
   * @param {ChatType[]} newChats - Newly fetched messages.
   * @returns {boolean} - Boolean whether chats are the same.
   */
  const areChatsEqual = (currentChats: ChatType[], newChats: ChatType[]) => {
    const currentChatsMap = new Map(currentChats.map(chat => [chat.id, chat]));
    const newChatsMap = new Map(newChats.map(chat => [chat.id, chat]));

    // Check for the same number of unique IDs
    if (currentChatsMap.size !== newChatsMap.size) return false;

    // Check each chat in the new set against the old
    for (const [id, newChat] of newChatsMap.entries()) {
      const currentChat = currentChatsMap.get(id);

      // If there's a new chat id or a timestamp difference, not equal
      if (!currentChat || currentChat.time_sent !== newChat.time_sent) {
        return false;
      }
    }
    return true;
  };

  const updateChatsAndUnreadStatus = (
    currentChats: ChatType[],
    newChats: ChatType[],
  ) => {
    let hasNewUnread = false;
    const updatedChats = newChats.map(newChat => {
      const currentChat = currentChats.find(c => c.id === newChat.id);
      // Assuming 'read' is a property indicating if the latest message was read
      if (
        currentChat &&
        (newChat.time_sent > currentChat.time_sent || !currentChat.read)
      ) {
        hasNewUnread = true;
        return { ...newChat, read: false }; // Mark as unread
      }
      return newChat;
    });

    // Update state
    setChats(updatedChats);
    console.log('ChatContext: updateChats trigger');
    if (hasNewUnread) setHasUnread(true);
  };

  const markChatAsReadById = (chatId: string) => {
    setChats(prevChats => {
      return prevChats.map(chat => {
        if (chat.id === chatId) {
          return { ...chat, read: true };
        }
        return chat;
      });
    });
    unread.current -= 1;
    if (unread.current === 0) setHasUnread(false);
  };

  return (
    <ChatContext.Provider
      value={{
        your_id,
        chats,
        loggedIn,
        hasUnread,
        updateLoggedIn,
        updateFocus,
        markChatAsReadById,
      }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
