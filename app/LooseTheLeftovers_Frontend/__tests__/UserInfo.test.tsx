import React, { useState, useEffect } from 'react';
import { render, waitFor } from '@testing-library/react-native';
import UserInfo from '../src/components/UserInfo';
import { retrieveUserSession } from '../src/common/EncryptedSession';
import { SecureAPIReq } from '../src/common/NetworkRequest';

// Mocking the network request module
jest.mock('../src/common/NetworkRequest', () => ({
  SecureAPIReq: {
    createInstance: jest.fn(() => ({
      get: jest.fn(async (userId: string) => {
        return {
          data: {
            username: `mockUsername-${userId}`,
            email: `mockEmail-${userId}`,
          },
        };
      }),
    })),
  },
}));

describe('UserInfo Component', () => {
  test('displays the correct user information', async () => {
    const TestComponent = () => {
      const [userInfo, setUserInfo] = useState({ username: '', email: '' });

      const fetchUserInfo = async () => {
        try {
          // Retrieve session data
          const userSesh: Record<string, string> = await retrieveUserSession();
          // Gets user id from session data
          const userId: string = userSesh['user_id'];
          console.log(userId);

          // Retrieves user data using userid
          const newReq: SecureAPIReq = await SecureAPIReq.createInstance();
          const res: any = await newReq.get(`users/${userId}`);

          const data = res.data;

          setUserInfo({ username: data.username, email: data.email });
        } catch (error) {
          console.error('Failed to fetch user info:', error);
        }
      };

      useEffect(() => {
        fetchUserInfo();
      }, []);

      return (
        <UserInfo userInfo={userInfo} userInfoKeys={['username', 'email']} />
      );
    };

    // Render the component
    const { getByText } = render(<TestComponent />);

    // Wait for the component to fetch user information
    await waitFor(() => {
      // Check if each piece of user information is present in the rendered component
      expect(getByText(/mockUsername/)).toBeTruthy();
      expect(getByText(/mockEmail/)).toBeTruthy();
    });
  });
});

/