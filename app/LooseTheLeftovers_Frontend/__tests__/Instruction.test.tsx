import React from 'react';
import { render } from '@testing-library/react-native';

import Instruction from '../src/screens/Instruction';

jest.mock('axios');
jest.mock('react-native', () => {
  const rn = jest.requireActual('react-native');
  rn.Alert.alert = jest.fn();
  return rn;
});

const navigation = {
  navigate: jest.fn(), // Mocking the navigate function
};
beforeEach(() => {
  jest.clearAllMocks(); // Clear all mocks including axios
});

describe('Get started component', () => {
  it('Welcome text renders correctly', () => {
    // Check if Welcome text is rendered
    const { getByText } = render(<Instruction navigation={navigation} />);
    expect(getByText('Weclome!')).toBeTruthy();
  });
  // Check if first instruction text is rendered
  it('first instruction renders correctly', () => {
    const { getByText } = render(<Instruction navigation={navigation} />);
    expect(
      getByText('-This is an app to share left over to others in need'),
    ).toBeTruthy();
  });
  // Check if second instruction text is rendered
  it('second instruction renders correctly', () => {
    const { getByText } = render(<Instruction navigation={navigation} />);
    expect(
      getByText(
        '-You can view others food posts, makes posts yourself and communicate with other users to set a time and place for pickup',
      ),
    ).toBeTruthy();
  });
  // Check if third instruction text is rendered
  it('third instruction renders correctly', () => {
    const { getByText } = render(<Instruction navigation={navigation} />);
    expect(
      getByText(
        '-It has some unique features like the ability how long the food will expire in, and the ability end a conversation once a deal has been made.',
      ),
    ).toBeTruthy();
  });
  // Check if text is rendered
  it('Get started button renders correctly', () => {
    const { getByText } = render(<Instruction navigation={navigation} />);
    expect(getByText('Get Started')).toBeTruthy();
  });
});
