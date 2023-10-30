import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Login from '../src/screens/Login';

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
    const { getByPlaceholderText, getByText } = render(<Login />);

    // Simulate user input in the username field
    fireEvent.changeText(getByPlaceholderText('Username'), 'testuser');
    // Simulate user input in the password field
    fireEvent.changeText(getByPlaceholderText('Password'), 'testpassword');

    // Simulate button press
    fireEvent.press(getByText('Login'));

    // Wait for the asynchronous operation to complete
    await waitFor(() => {
      // Check if the expected API call is made (you might need to use a testing library/mock for this)
      // Check if the expected success/failure message is displayed
      // assert any other expectations based on your API call
    });
  });
});
