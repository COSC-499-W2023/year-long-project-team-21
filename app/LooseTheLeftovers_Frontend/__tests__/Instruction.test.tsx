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
    expect(getByText('Welcome!')).toBeTruthy();
  });
  // Check if first instruction text is rendered
  it('first instruction renders correctly', () => {
    const { getByText } = render(<Instruction navigation={navigation} />);
    expect(
      getByText('This is an app to share left over food to others in need'),
    ).toBeTruthy();
  });
  // Check if second instruction text is rendered
  it('second instruction renders correctly', () => {
    const { getByText } = render(<Instruction navigation={navigation} />);
    expect(getByText('See what others are offering')).toBeTruthy();
  });
  // Check if third instruction text is rendered
  it('third instruction renders correctly', () => {
    const { getByText } = render(<Instruction navigation={navigation} />);
    expect(getByText('Select the range')).toBeTruthy();
  });
  // Check if text is rendered
  it('Get started button renders correctly', () => {
    const { getByText } = render(<Instruction navigation={navigation} />);
    expect(getByText('Get Started')).toBeTruthy();
  });
});
