import Geolocation, {
  GeoCoordinates,
  GeoPosition,
} from 'react-native-geolocation-service';
import { Alert, Linking, PermissionsAndroid, Platform } from 'react-native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import EncryptedStorage from 'react-native-encrypted-storage';
import { getLocationPermissionAndroid } from '../common/LocationServices';

/**
 * Class representing a location service utility.
 */
class LocationService {
  location: GeoPosition | undefined;
  hasPermission: boolean;
  os: string;
  private threshold: number;

  /**
   * Constructs a new LocationService instance.
   */
  constructor() {
    this.location = undefined;
    this.hasPermission = false;
    this.os = this.getOS();
    this.threshold = 120000;
  }

  /**
   * Static factory method to create and initialize a LocationService instance.
   * @returns {LocationService} An instance of LocationService.
   * @throws {Error} Throws an error if an issue occurs during initialization.
   */
  static async CreateAndInitialize() {
    const instance = new LocationService();
    await instance.initializeLocationService();
    return instance;
  }

  /**
   * Gets the operating system identifier.
   * @returns {string} The operating system identifier.
   * @throws {Error} Throws an error if an issue occurs.
   * @private
   */
  private getOS() {
    switch (Platform.OS) {
      case 'ios':
        return 'ios';
      case 'android':
        return 'android';
      default:
        return 'unknown';
    }
  }

  //it should be declared when the class is instantiated. Ask location permission as well as get chached location.
  /**
   * Initializes the location service by requesting permission and getting cached location or location from the user.
   * @throws {Error} Throws an error if an issue occurs during initialization.
   */
  public async initializeLocationService() {
    try {
      if (this.os === 'android')
        this.hasPermission = await this.getLocationPermissionAndroid();
      else this.hasPermission = await this.getLocationPermissionIOS();

      if (this.hasPermission) {
        const location = await this.getCachedLocation();
        if (location === null) this.getLocation();
      }
    } catch (error: any) {
      throw new Error(`Error initialize Location Service: ${error.message}`);
    }
  }

  /**
   * Opens the device settings for the app.
   * @throws {Error} Throws an error if an issue occurs.
   * @private
   */
  private async openSettings() {
    try {
      if (Platform.OS === 'ios') {
        Linking.openURL('app-settings');
      } else {
        Linking.openSettings();
      }
    } catch (error: any) {
      throw new Error(`Error open settings: ${error.message}`);
    }
  }

  /**
   * Requests location permission on iOS.
   * @returns {Promise<boolean>} True if permission granted, false otherwise.
   * @throws {Error} Throws an error if an issue occurs.
   */
  public async getLocationPermissionIOS() {
    try {
      const permission = Platform.select({
        ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        android: null, // For Android, return null or handle differently if needed
      });

      if (!permission) {
        console.log('Unsupported platform for iOS location permission');
        return false;
      }

      const result = await request(permission);

      if (result === RESULTS.GRANTED) {
        console.log('You can use Geolocation');
        return true;
      } else if (result === RESULTS.DENIED) {
        console.log('Geolocation permission denied');
        // Handle denial if needed
        return false;
      } else if (result === RESULTS.BLOCKED) {
        console.log('Geolocation permission denied and blocked');
        this.promptToChangeLocationSettings();
        return false;
      }

      console.log('You cannot use Geolocation');
      return false;
    } catch (error: any) {
      console.log(`Error getLocationPermissionIOS: ${error.message}`);
      return false;
    }
  }

  //asks location permission. Returns boolean value depending on the status.
  /**
   * Asks location permission on Android.
   * @returns {Promise<boolean>} True if permission granted, false otherwise.
   * @throws {Error} Throws an error if an issue occurs.
   */
  public async getLocationPermissionAndroid() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Access',
          message: 'Please enable location services to access ads nearby.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === 'granted') {
        return true;
      } else if (granted == 'never_ask_again') {
        console.log('The user denied to be asked again.');
        this.promptToChangeLocationSettings();
        return false;
      } else {
        console.log('You cannot use Geolocation');
        return false;
      }
    } catch (error: any) {
      console.log(`Error getLocationPermissionAndroid: ${error.message}`);
      return false;
    }
  }

  //When the user denied the permission (never ask again status), we beg to change the setting with this function.
  /**
   * Prompts the user to change location settings.
   * @throws {Error} Throws an error if an issue occurs.
   */
  public async promptToChangeLocationSettings() {
    const message =
      'To use this app, please enable location permissions in settings.';
    try {
      Alert.alert(
        'Location Permissions Required',
        message,
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Open Settings',
            onPress: () => this.openSettings(),
          },
        ],
        { cancelable: false },
      );
    } catch (error: any) {
      throw new Error(
        `Error prompt to change location settings: ${error.message}`,
      );
    }
  }

  //get current user device's location, it will call saveLocationToCache if the location is successfully retrieved.
  /**
   * Gets the device's current location.
   * @throws {Error} Throws an error if an issue occurs.
   */
  public async getLocation(): Promise<{latitude: number, longitude: number}> {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        async position => {
          // Extract latitude and longitude from the position
          const { latitude, longitude } = position.coords;
          
          // Optionally, save the location to cache here
          await this.saveLocationToCache(position.coords);
          
          // Resolve the promise with the latitude and longitude
          resolve({ latitude, longitude });
        },
        async error => {
          // Attempt to retrieve the cached location on error
          const cachedLocation = await this.getCachedLocation();
          
          if (cachedLocation) {
            // Assuming cachedLocation has latitude and longitude
            resolve({ latitude: cachedLocation.latitude, longitude: cachedLocation.longitude });
          } else {
            // Reject the promise if there's an error and no cached location
            reject(new Error(error.message));
          }
        },
        { enableHighAccuracy: true, timeout: 1500, maximumAge: 10000 },
      );
    });
  }

export default LocationService;
