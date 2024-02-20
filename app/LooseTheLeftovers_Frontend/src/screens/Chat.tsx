import React, { useState, useCallback, useEffect } from 'react';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';

const Chat = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'How many brown are there?',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Mike Brown',
        },
      },
    ])
  }, []);

  const onSend = useCallback((messages: IMessage[] = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={ (messages: IMessage[]) => onSend(messages) }
      user={{
        _id: 1,
      }}
    />
  )
}

export default Chat;
