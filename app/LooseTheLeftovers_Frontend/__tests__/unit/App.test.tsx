import React from 'react';
import { render } from '@testing-library/react-native';
import App from '../../App'; // Assuming your app.tsx is located in the same directory as the test

describe('<App />', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId('loginTitle')).toBeTruthy(); //Login screen will be rendered at first
  });
});
