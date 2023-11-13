import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import axios from 'axios';
import { Alert } from 'react-native';
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
    const { getByPlaceholderText, getByTestId } = render(<Login navigation={navigation} />);
   
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
    fireEvent.changeText(getByPlaceholderText('Username'), 'testuser@mail.com');
    // Simulate user input in the password field
    fireEvent.changeText(getByPlaceholderText('Password'), 'testpassword');

    // Check if the input values are updated
    expect(getByPlaceholderText('Username').props.value).toBe('testuser@mail.com');
    expect(getByPlaceholderText('Password').props.value).toBe('testpassword');
  });


  it('handles button press - success', async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    const { getByPlaceholderText, getByTestId } = render(<Login navigation={navigation} />);
    
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
        "http://10.0.2.2:8000/users/token",
        {
          username: 'testuser',
          password: 'testpassword'
        }
      );
      // Check if the expected success/failure message is displayed
      expect(Alert.alert).toHaveBeenCalledWith(
        'Login Successful', 
        'Token: fake_token'
      );
      // assert any other expectations based on your API call
    });
  });
   
  it('handles button press - failure to send API request',async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    // Mock a failed API response
    mockedAxios.post.mockRejectedValueOnce(new Error('API error'));

    const { getByPlaceholderText, getByTestId } = render(<Login navigation = {navigation} />);
    
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
        "http://10.0.2.2:8000/users/token",
        {
          username: 'testuser',
          password: 'testpassword'
        }
      );
      // Check if the expected success/failure message is displayed
      expect(Alert.alert).toHaveBeenCalledWith(
        'Error',
        'An error occurred while trying to retrieve data.'
      );
    });
  });

  it('handles button press - failure to login with invalid credentials',async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    const { getByPlaceholderText, getByTestId } = render(<Login navigation={navigation} />);
         
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
        "http://10.0.2.2:8000/users/token",
        {
          username: 'wrongtestuser',
          password: 'wrongtestpassword'
        }
      );
      // Check if the expected success/failure message is displayed
      expect(Alert.alert).toHaveBeenCalledWith(
        'Error',
        'Failed to login or retrieve token.'
      );
    });
  });
  
});
