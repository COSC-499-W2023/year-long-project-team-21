import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ChatListItem from '../../../src/components/chatlist-utils/ChatListItem';

describe('ChatListItem Component Tests', () => {
  const mockChatData = {
    id: 1,
    name: 'John Doe',
    lastMessage: 'Hey, how are you?',
    timestamp: '2020-01-01T00:00:00.000Z',
  };

  it('displays the chat name and last message', () => {
    const { getByText } = render(
      <ChatListItem chat={mockChatData} onPress={() => {}} />,
    );

    expect(getByText(mockChatData.name)).toBeTruthy();
    expect(getByText(mockChatData.lastMessage)).toBeTruthy();
  });

  it('triggers onPress event when pressed', () => {
    const mockOnPress = jest.fn();

    const { getByTestId } = render(
      <ChatListItem chat={mockChatData} onPress={mockOnPress} />,
    );

    const chatListItem = getByTestId('chatlist-item-test');
    fireEvent.press(chatListItem);

    expect(mockOnPress).toHaveBeenCalledWith(mockChatData.id);
  });
});
