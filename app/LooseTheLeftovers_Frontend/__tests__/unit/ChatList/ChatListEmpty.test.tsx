import React from 'react';
import { render } from '@testing-library/react-native';
import ChatListEmptyComponent from '../../../src/components/chatlist-utils/ChatListEmpty';

describe('ChatListEmptyComponent Tests', () => {
  it('displays the correct message when there are no messages', () => {
    const { getByText } = render(<ChatListEmptyComponent />);

    expect(getByText('No messages so far!')).toBeTruthy();
  });
});
