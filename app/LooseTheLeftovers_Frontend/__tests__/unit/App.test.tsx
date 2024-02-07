// import React from 'react';
// import { render } from '@testing-library/react-native';
// import App from '../../App';

// // Mocking Navigation
// jest.mock('@react-navigation/native', () => {
//   return {
//     ...jest.requireActual('@react-navigation/native'),
//     useNavigation: jest.fn(),
//   };
// });

// describe('<App />', () => {
//   it('renders without crashing', () => {
//     const { getByTestId } = render(<App />);
//     const loginTextElement = getByText('Login'); // Assuming 'Login' text is present in the rendered component
//     expect(loginTextElement).toBeTruthy();
//   });
// });


// import React from 'react';
// import { render } from '@testing-library/react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { navigationRef } from '../../src/navigation/NavigationService';
// import App from '../../App';

// // Mock the NavigationContainer component
// jest.mock('@react-navigation/native', () => ({
//   NavigationContainer: jest.fn(({ children, ref }) => (
//     <div data-testid="navigation-container" ref={ref}>
//       {children}
//     </div>
//   )),
// }));

// describe('<App />', () => {
//   it('renders without crashing', () => {
//     render(<App />);
//     expect(NavigationContainer).toHaveBeenCalledWith({ ref: navigationRef }, {});
//   });
// });
import React from 'react';
import { render } from '@testing-library/react-native';
import App from '../../App';
import { NavigationContainer } from '@react-navigation/native';

// Ensure that navigationRef is defined before the mock setup
const navigationRef = React.createRef<any>();

// Mock the NavigationContainer component
jest.mock('@react-navigation/native', () => {
  const ActualNavigationContainer = jest.requireActual('@react-navigation/native').NavigationContainer;
  return {
    __esModule: true,
    ...jest.requireActual('@react-navigation/native'),
    NavigationContainer: ({ children }: { children: React.ReactNode }) => (
      <ActualNavigationContainer ref={navigationRef}>{children}</ActualNavigationContainer>
    ),
  };
});

describe('<App />', () => {
  it('renders without crashing', () => {
    render(<App />);
    // Assert that the NavigationContainer is properly mocked and used
    expect(NavigationContainer).toHaveBeenCalled();
  });
});
