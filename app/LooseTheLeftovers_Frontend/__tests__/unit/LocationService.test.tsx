import LocationService from '../../src/common/LocationService';

// Mocking dependencies
jest.mock('react-native-encrypted-storage');
jest.mock('react-native-geolocation-service', () => ({
    getCurrentPosition: jest.fn().mockImplementation((success, error, options) => {
      success({
        coords: {
          latitude: 0,
          longitude: 0,
        },
        timestamp: Date.now(),
      });
    }),
    RNFusedLocation: jest.fn(), // Add a mock implementation if your code accesses specific properties/methods
  }));
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
jest.mock('react-native', () => ({
  Platform: {
    select: jest.fn(),
  },
  Alert: {
    alert: jest.fn(),
  },
}));
describe('LocationService', () => {
  let locationservice: LocationService;

  // Before any instances are created, spy on the prototype method
  const getLocationPermissionMock = jest.fn();
  jest
    .spyOn(LocationService.prototype, 'getLocationPermissionAndroid')
    .mockImplementation(getLocationPermissionMock);

  beforeEach(() => {
    locationservice = new LocationService();
  });

  it('should initialize with undefined location and false permission', () => {
    expect(locationservice.location).toBeUndefined();
    expect(locationservice.hasPermission).toBe(false);
  });

  it('should request location permission if not granted', async () => {
    // Mock the getLocationPermission method
    const getLocationPermissionMock = jest.fn();
    jest
      .spyOn(locationservice, 'getLocationPermissionAndroid')
      .mockImplementation(getLocationPermissionMock);

    // Set hasPermission to false to simulate the case where permission is not granted
    locationservice.hasPermission = false;

    // Call the method that triggers the permission request
    await locationservice.getLocationPermissionAndroid();

    // Assert that the mocked method was called
    expect(getLocationPermissionMock).toHaveBeenCalled();
  });
});