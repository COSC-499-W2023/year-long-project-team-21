import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import Login from '../src/screens/Login';

jest.mock('axios');
jest.mock('react-native', () => {
  const rn = jest.requireActual('react-native');
  rn.Alert.alert = jest.fn();
  return rn;
});

const navigation = {
  navigate: jest.fn(), // Mocking the navigate function
};

describe('Login component', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear all mocks including axios
  });

  it('renders correctly', () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Login navigation={navigation} />,
    );

    // Check if the username and password input fields are rendered
    expect(getByPlaceholderText('Username')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();

    // Use testID to get the specific elements
    const loginTitle = getByTestId('loginTitle');
    const loginButton = getByTestId('loginButton');

    expect(loginTitle).toBeTruthy();
    expect(loginButton).toBeTruthy();
  });

  it('handles input changes', () => {
    const { getByPlaceholderText } = render(<Login navigation={navigation} />);

    // Simulate user input in the username field
    fireEvent.changeText(getByPlaceholderText('Username'), 'testuser');
    // Simulate user input in the password field
    fireEvent.changeText(getByPlaceholderText('Password'), 'testpassword');

    // Check if the input values are updated
    expect(getByPlaceholderText('Username').props.value).toBe('testuser');
    expect(getByPlaceholderText('Password').props.value).toBe('testpassword');
  });

  it('handles button press - success', async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    const { getByPlaceholderText, getByTestId, queryByTestId } = render(
      <Login navigation={navigation} />,
    );

    // Simulate user input in the username field
    fireEvent.changeText(getByPlaceholderText('Username'), 'testuser');
    // Simulate user input in the password field
    fireEvent.changeText(getByPlaceholderText('Password'), 'testpassword');
    // Simulate button press
    fireEvent.press(getByTestId('loginButton'));

    // Wait for the asynchronous operation to complete
    await waitFor(() => {
      // Check if the Axios POST request is called with the correct arguments
      expect(mockedAxios.post).toHaveBeenCalledWith(
        'http://10.0.2.2:8000/users/token',
        {
          username: 'testuser',
          password: 'testpassword',
        },
      );
      // Since this is a success scenario, check that the error message is not displayed
      expect(queryByTestId('error-msg')).toBeNull();
    });
  });

  it('navigates to the next screen on successful login', async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    // Mock a successful API response
    mockedAxios.post.mockResolvedValueOnce({
      status: 200,
      data: { token: 'fake_token' },
    });

    const { getByPlaceholderText, getByTestId } = render(
      <Login navigation={navigation} />,
    );

    // Simulate user input and button press
    fireEvent.changeText(getByPlaceholderText('Username'), 'testuser');
    fireEvent.changeText(getByPlaceholderText('Password'), 'testpassword');
    fireEvent.press(getByTestId('loginButton'));

    await waitFor(() => {
      // Check if navigation was triggered with the correct screen name
      expect(navigation.navigate).toHaveBeenCalledWith('Instruction');
    });
  });

  it('handles button press - failure to send API request', async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    // Mock a failed API response
    mockedAxios.post.mockRejectedValueOnce(new Error('API error'));

    const { getByPlaceholderText, getByTestId, queryByTestId } = render(
      <Login navigation={navigation} />,
    );

    // Simulate user input in the username field
    fireEvent.changeText(getByPlaceholderText('Username'), 'testuser');
    // Simulate user input in the password field
    fireEvent.changeText(getByPlaceholderText('Password'), 'testpassword');

    // Simulate button press
    fireEvent.press(getByTestId('loginButton'));

    // Wait for the asynchronous operation to complete
    await waitFor(() => {
      // Check if the Axios POST request is called with the correct arguments
      expect(mockedAxios.post).toHaveBeenCalledWith(
        'http://10.0.2.2:8000/users/token',
        {
          username: 'testuser',
          password: 'testpassword',
        },
      );
      // Find the error message element
      const errorMessageElement = getByTestId('error-msg');

      // Check if the error message text is correct
      expect(errorMessageElement.props.children).toBe(
        'An error occurred while trying to retrieve data.',
      );
    });
  });

  it('handles button press - failure to login with invalid credentials', async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    const { getByPlaceholderText, getByTestId, queryByTestId } = render(
      <Login navigation={navigation} />,
    );

    // Simulate user input in the username field
    fireEvent.changeText(getByPlaceholderText('Username'), 'wrongtestuser');
    // Simulate user input in the password field
    fireEvent.changeText(getByPlaceholderText('Password'), 'wrongtestpassword');

    // Mock a bad response (Unauthorized) from the API
    mockedAxios.post.mockResolvedValueOnce({
      status: 401,
      data: {
        error: 'Invalid credentials',
      },
    });

    // Simulate button press
    fireEvent.press(getByTestId('loginButton'));

    // Wait for the asynchronous operation to complete
    await waitFor(() => {
      // Check if the Axios POST request is called with the correct arguments
      expect(mockedAxios.post).toHaveBeenCalledWith(
        'http://10.0.2.2:8000/users/token',
        {
          username: 'wrongtestuser',
          password: 'wrongtestpassword',
        },
      );
      // Find the error message element
      const errorMessageElement = getByTestId('error-msg');

      // Check if the expected success/failure message is displayed
      expect(errorMessageElement.props.children).toBe(
        'Failed to login or retrieve token.',
      );
    });
  });

  it('stores JWT token on successful login', async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    // Mock a successful API response
    mockedAxios.post.mockResolvedValueOnce({
      status: 200,
      data: { token: 'fake_token' },
    });
  
    const { getByPlaceholderText, getByTestId } = render(
      <Login navigation={navigation} />,
    );
  
    // Simulate user input and button press
    fireEvent.changeText(getByPlaceholderText('Username'), 'testuser');
    fireEvent.changeText(getByPlaceholderText('Password'), 'testpassword');
    fireEvent.press(getByTestId('loginButton'));
  
    await waitFor(() => {
      // Check if the token is stored in EncryptedStorage
      expect(EncryptedStorage.setItem).toHaveBeenCalledWith(
        'user_token',
        'fake_token'
      );
    });
  });

  it('does not store JWT token on invalid login', async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    // Mock a bad response (e.g., Unauthorized) from the API
    mockedAxios.post.mockRejectedValueOnce(new Error('Invalid credentials'));
  
    const { getByPlaceholderText, getByTestId } = render(
      <Login navigation={navigation} />,
    );
  
    // Simulate user input with invalid credentials
    fireEvent.changeText(getByPlaceholderText('Username'), 'wrongUser');
    fireEvent.changeText(getByPlaceholderText('Password'), 'wrongPassword');
    fireEvent.press(getByTestId('loginButton'));
  
    await waitFor(() => {
      // Check that the token is not stored in EncryptedStorage
      expect(EncryptedStorage.setItem).not.toHaveBeenCalled();
    });
  });
  
  
});
