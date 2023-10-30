import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Login from '../src/screens/Login';

// Import and configure fetchMock
import fetchMock from 'jest-fetch-mock';
fetchMock.enableMocks();

describe('Login component', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('handles button press - success scenario', async () => {
    const { getByPlaceholderText, getByText } = render(<Login />);
    
    // Simulate user input in the username field
    fireEvent.changeText(getByPlaceholderText('Username'), 'testuser');
    // Simulate user input in the password field
    fireEvent.changeText(getByPlaceholderText('Password'), 'testpassword');

    // Mock a successful API response
    fetchMock.mockResponseOnce(JSON.stringify({ token: 'mockedToken' }));

    // Simulate button press
    fireEvent.press(getByText('Login'));

    // Wait for the asynchronous operation to complete
    await waitFor(() => {
      // Check if the expected success message is displayed
      expect(getByText('Login Successful')).toBeTruthy();
    });
  });

  it('handles button press - error scenario', async () => {
    const { getByPlaceholderText, getByText } = render(<Login />);
    
    // Simulate user input in the username field
    fireEvent.changeText(getByPlaceholderText('Username'), 'testuser');
    // Simulate user input in the password field
    fireEvent.changeText(getByPlaceholderText('Password'), 'testpassword');

    // Mock an error API response
    fetchMock.mockReject(new Error('API error'));

    // Simulate button press
    fireEvent.press(getByText('Login'));

    // Wait for the asynchronous operation to complete
    await waitFor(() => {
      // Check if the expected error message is displayed
      expect(getByText('Failed to login or retrieve token.')).toBeTruthy();
    });
  });
});

