import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ChatList from '../../../src/screens/ChatList';
import chatData from '../../../src/assets/dummy_chats.json';
import { NavigationContainer } from '@react-navigation/native';

const navigation = {
  navigate: jest.fn(),
};

const MockedChatList = () => (
  <NavigationContainer>
    <ChatList navigation={{ navigate: navigation }} />
  </NavigationContainer>
);

describe('ChatList Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { getByTestId, getByText } = render(<MockedChatList />);
    expect(getByTestId('title-test')).toBeDefined();
    // Only check the first three chats
    chatData.slice(0, 3).forEach(chat => {
      expect(getByText(chat.name)).toBeDefined();
      expect(getByText(chat.lastMessage)).toBeDefined();
    });
  });

  it('logs chat id on press', () => {
    const consoleSpy = jest.spyOn(console, 'log');

    const { getByText } = render(<MockedChatList />);
    const firstChatName = chatData[0].name;
    fireEvent.press(getByText(firstChatName));

    expect(consoleSpy).toHaveBeenCalledWith('Pressed chat:', chatData[0].id);

    consoleSpy.mockRestore();
  });

  it('checks if TabBar Icons are present and pressable', () => {
    const { getByTestId } = render(<MockedChatList />);

    const homeIcon = getByTestId('HomeIconTest');
    expect(homeIcon).toBeTruthy();
    fireEvent.press(homeIcon);

    const createIcon = getByTestId('CreateAdIconTest');
    expect(createIcon).toBeTruthy();
    fireEvent.press(createIcon);

    const accountIcon = getByTestId('AccountIconTest');
    expect(accountIcon).toBeTruthy();
    fireEvent.press(accountIcon);
  });
});
