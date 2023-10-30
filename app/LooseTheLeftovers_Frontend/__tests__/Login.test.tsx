import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import axios from 'axios';
import Login from '../src/screens/Login';
import { Alert } from 'react-native';

jest.mock('axios');
jest.mock('react-native', () => {
  const rn = jest.requireActual('react-native');
  rn.Alert.alert = jest.fn();
  return rn;
});

describe('Login component', () => {
  it('renders correctly', () => {
    const { getByPlaceholderText, getByText } = render(<Login />);
    
    // Check if the username and password input fields are rendered
    expect(getByPlaceholderText('Username')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();

    // Check if the Login button is rendered
    expect(getByText('Login')).toBeTruthy();
  });

  it('handles input changes', () => {
    const { getByPlaceholderText } = render(<Login />);
    
    // Simulate user input in the username field
    fireEvent.changeText(getByPlaceholderText('Username'), 'testuser');
    // Simulate user input in the password field
    fireEvent.changeText(getByPlaceholderText('Password'), 'testpassword');

    // Check if the input values are updated
    expect(getByPlaceholderText('Username').props.value).toBe('testuser');
    expect(getByPlaceholderText('Password').props.value).toBe('testpassword');
  });

  it('handles button press', async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    const { getByPlaceholderText, getByText } = render(<Login />);
    
    // Simulate user input in the username field
    fireEvent.changeText(getByPlaceholderText('Username'), 'testuser');
    // Simulate user input in the password field
    fireEvent.changeText(getByPlaceholderText('Password'), 'testpassword');
    // Simulate button press
    fireEvent.press(getByText('Login'));

    // Wait for the asynchronous operation to complete
    await waitFor(() => {
      // Check if the Axios POST request is called with the correct arguments
      expect(mockedAxios.post).toHaveBeenCalledWith(
        "http://127.0.0.1:8000/users/token",
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
});
