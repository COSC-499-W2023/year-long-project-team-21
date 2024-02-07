import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ChatList from '../../src/screens/ChatList';
import chatData from '../../src/assets/chat_placeholder.json';

const navigation = {
  navigate: jest.fn(),
};

describe('ChatList Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { getByText } = render(<ChatList navigation={navigation} />);
    expect(getByText('Messages')).toBeDefined();
    // Only check the first three chats
    chatData.slice(0, 3).forEach((chat) => {
      expect(getByText(chat.name)).toBeDefined();
      expect(getByText(chat.lastMessage)).toBeDefined();
    });
  });

  it('logs chat id on press', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    
    const { getByText } = render(<ChatList navigation={navigation} />);
    const firstChatName = chatData[0].name;
    fireEvent.press(getByText(firstChatName));
  
    expect(consoleSpy).toHaveBeenCalledWith('Pressed chat:', chatData[0].id);
  
    consoleSpy.mockRestore();
  });
  

  it('navigates to Home and Profile on tab press', () => {
    const { getByTestId } = render(<ChatList navigation={navigation} />);
    fireEvent.press(getByTestId('left-test'));
    expect(navigation.navigate).toHaveBeenCalledWith('Home');
    fireEvent.press(getByTestId('right-test'));
    expect(navigation.navigate).toHaveBeenCalledWith('Profile');
  });
});
