// __tests__/App-test.js

import React from 'react';
import { render } from '@testing-library/react-native';
import App from '../App';  // Adjust the path to where your App component is located

// Mocking Navigation
jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: jest.fn(),
  };
});

describe('<App />', () => {
  it('renders without crashing', () => {
    const { getByText } = render(<App />);
    expect(getByText('Login')).toBeTruthy();
  });
});
