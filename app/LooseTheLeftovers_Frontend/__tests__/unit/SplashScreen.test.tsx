import React from 'react';
import { render } from '@testing-library/react-native';
import SplashScreen from '../../src/screens/SplashScreen';
import * as GlobalContext from '../../src/common/GlobalContext';

jest.mock('react-native-permissions', () => ({
  check: jest.fn(() => Promise.resolve('granted')),
  request: jest.fn(() => Promise.resolve('granted')),
  PERMISSIONS: {
    IOS: {
      LOCATION_WHEN_IN_USE: 'LOCATION_WHEN_IN_USE',
    },
    ANDROID: {
      ACCESS_FINE_LOCATION: 'ACCESS_FINE_LOCATION',
    },
  },
  RESULTS: {
    UNAVAILABLE: 'unavailable',
    DENIED: 'denied',
    GRANTED: 'granted',
    BLOCKED: 'blocked',
  },
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

describe('SplashScreen', () => {
  it('should render the splash screen component with the correct testID', () => {
    jest.spyOn(GlobalContext, 'useGlobal').mockReturnValue({
      updateFirstLaunch: jest.fn(),
      updateLocationPermission: jest.fn(),
      firstLaunch: false,
      locationPermission: 'granted',
      userId: '123',
      setUserId: jest.fn(),
    });
    const { getByTestId } = render(
      <SplashScreen navigation={{ navigate: jest.fn() }} />,
    );

    // Assert that an element with testID "SplashScreen" is in the document
    expect(getByTestId('SplashScreen')).toBeTruthy();
  });
});
