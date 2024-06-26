import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Registration from '../../src/screens/Registration';
import axios from 'axios';

// Mocking a function
jest.mock('axios');
jest.mock('react-native', () => {
  const rn = jest.requireActual('react-native');
  rn.Alert.alert = jest.fn();
  return rn;
});
// Mocking the navigate function
const navigation = {
  navigate: jest.fn(),
};

describe('Registration Component', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear all mocks including axios
  });

  test('renders correctly', () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Registration navigation={navigation} />,
    );

    // Check if key input fileds are rendered
    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Username')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    expect(getByPlaceholderText('Confirm Password')).toBeTruthy();

    // Check if Register button is rendered
    expect(getByTestId('register-button')).toBeTruthy();
  });

  test('handles input changes', () => {
    const { getByPlaceholderText } = render(
      <Registration navigation={navigation} />,
    );

    // Simulate input changes
    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Username'), 'testuser');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password123!');
    fireEvent.changeText(
      getByPlaceholderText('Confirm Password'),
      'password123!',
    );

    // Check if input values are updated
    expect(getByPlaceholderText('Email').props.value).toBe('test@example.com');
    expect(getByPlaceholderText('Username').props.value).toBe('testuser');
    expect(getByPlaceholderText('Password').props.value).toBe('password123!');
    expect(getByPlaceholderText('Confirm Password').props.value).toBe(
      'password123!',
    );
  });

  test('handles button press - success', async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    const { getByPlaceholderText, getByTestId } = render(
      <Registration navigation={navigation} />,
    );

    // Simulate user input in the username field
    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    // Simulate user input in the password field
    fireEvent.changeText(getByPlaceholderText('Username'), 'testuser');
    // Simulate user input in the username field
    fireEvent.changeText(getByPlaceholderText('Password'), 'Test444test!');
    // Simulate user input in the confirm password field
    fireEvent.changeText(
      getByPlaceholderText('Confirm Password'),
      'Test444test!',
    );

    // Mock a good response
    mockedAxios.post.mockResolvedValueOnce({
      status: 200,
      data: {
        token: 'FakeToken',
      },
    });
    
    // Simulate button press
    fireEvent.press(getByTestId('register-button'));

    // Wait for the asynchronous operation to complete
    await waitFor(() => {
      // Check if the Axios POST request is called with the correct arguments
      expect(mockedAxios.post).toHaveBeenCalledWith(
        'http://10.0.2.2:8000/users/',
        {
          email: 'test@example.com',
          username: 'testuser',
          password: 'Test444test!',
          verify_password: 'Test444test!',
        },
      );
      // Check if the expected success/failure message is displayed
      expect(navigation.navigate).toHaveBeenCalledWith('Login');
    });
  });

  test('handles button press - failure to send API request', async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    // Mock a failed API response
    mockedAxios.post.mockRejectedValueOnce(new Error('API error'));
    const { getByPlaceholderText, getByTestId, getByText } = render(
      <Registration navigation={navigation} />,
    );

    // Simulate user input in the username field
    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    // Simulate user input in the password field
    fireEvent.changeText(getByPlaceholderText('Username'), 'testuser');
    // Simulate user input in the username field
    fireEvent.changeText(getByPlaceholderText('Password'), 'Test444test!');
    // Simulate user input in the password field
    fireEvent.changeText(
      getByPlaceholderText('Confirm Password'),
      'Test444test!',
    );
    // Simulate button press
    fireEvent.press(getByTestId('register-button'));

    // Wait for the asynchronous operation to complete
    await waitFor(() => {
      // Check if the Axios POST request is called with the correct arguments
      expect(mockedAxios.post).toHaveBeenCalledWith(
        'http://10.0.2.2:8000/users/',
        {
          email: 'test@example.com',
          username: 'testuser',
          password: 'Test444test!',
          verify_password: 'Test444test!',
        },
      );

      expect(getByText('Request error, unable to process.')).toBeTruthy();
    });
  });
  test('handles button press - failure to register with invalid credentials', async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    const { getByPlaceholderText, getByTestId, getByText } = render(
      <Registration navigation={navigation} />,
    );

    // Simulate user input in the username field
    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    // Simulate user input in the password field
    fireEvent.changeText(getByPlaceholderText('Username'), 'testuser');
    // Simulate user input in the username field
    fireEvent.changeText(getByPlaceholderText('Password'), 'Test444test!');
    // Simulate user input in the password field
    fireEvent.changeText(
      getByPlaceholderText('Confirm Password'),
      'Test444test!',
    );

    // Mock a bad response (Unauthorized) from the API
    mockedAxios.post.mockResolvedValueOnce({
      status: 401,
      data: {
        error: 'Invalid credentials',
      },
    });

    // Simulate button press
    fireEvent.press(getByTestId('register-button'));

    // Wait for the asynchronous operation to complete
    await waitFor(() => {
      // Check if the Axios POST request is called with the correct arguments
      expect(mockedAxios.post).toHaveBeenCalledWith(
        'http://10.0.2.2:8000/users/',
        {
          email: 'test@example.com',
          username: 'testuser',
          password: 'Test444test!',
          verify_password: 'Test444test!',
        },
      );

      expect(getByText('Server error, unable to process.')).toBeTruthy();
    });
  });
});
