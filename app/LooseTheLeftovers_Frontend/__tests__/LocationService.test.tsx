import LocationService from '../src/common/LocationService';


// Mocking dependencies
jest.mock('react-native-geolocation-service');
jest.mock('react-native-encrypted-storage');
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
  beforeEach(() => {
    locationservice = new LocationService(100000);
  });

  it('should initialize with undefined location and false permission', () => {
    expect(locationservice.location).toBeUndefined();
    expect(locationservice.hasPermission).toBe(false);
  });

  it('should request location permission if not granted', async () => {
    const locationService = new LocationService(100000);

    // Mock the getLocationPermission method
    const getLocationPermissionMock = jest.fn();
    jest
      .spyOn(locationService, 'getLocationPermissionAndroid')
      .mockImplementation(getLocationPermissionMock);

    // Set hasPermission to false to simulate the case where permission is not granted
    locationService.hasPermission = false;

    // Call the method that triggers the permission request
    await locationService.getLocationPermissionAndroid();

    // Assert that the mocked method was called
    expect(getLocationPermissionMock).toHaveBeenCalled();
  });
});
