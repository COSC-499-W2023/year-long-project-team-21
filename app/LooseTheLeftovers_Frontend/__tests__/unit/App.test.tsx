import React from 'react';
import { render } from '@testing-library/react-native';
import App from '../../App';

// Mocking Navigation
jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: jest.fn(),
  };
});

describe('<App />', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId('instruction')).toBeTruthy();
  });
});
