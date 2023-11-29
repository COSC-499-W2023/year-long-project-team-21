// include this line for mocking react-native-gesture-handler
import 'react-native-gesture-handler/jestSetup';

// include this section and the NativeAnimatedHelper section for mocking react-native-reanimated
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};

  return Reanimated;
});

jest.mock('react-native-permissions', () => ({
  check: jest.fn(),
  request: jest.fn(),
  PERMISSIONS: {
    IOS: {
      LOCATION_WHEN_IN_USE: 'ios.permission.LOCATION_WHEN_IN_USE',
      LOCATION_ALWAYS: 'ios.permission.LOCATION_ALWAYS',
    },
    ANDROID: {
      ACCESS_FINE_LOCATION: 'android.permission.ACCESS_FINE_LOCATION',
    },
  },
  RESULTS: {
    GRANTED: 'granted',
  },
}));

jest.mock('react-native-geolocation-service', () => ({
  getCurrentPosition: jest.fn(),
}));

jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
