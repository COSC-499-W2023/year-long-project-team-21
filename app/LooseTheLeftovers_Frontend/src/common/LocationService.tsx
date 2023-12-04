import Geolocation, {
  GeoCoordinates,
  GeoPosition,
} from 'react-native-geolocation-service';
import { Alert, Linking, PermissionsAndroid, Platform } from 'react-native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import EncryptedStorage from 'react-native-encrypted-storage';

/**
 * Class representing a location service utility.
 */
class LocationService {
  location: GeoPosition | undefined;
  hasPermission: boolean | null;
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
   * Sets the threshold for location timestamp validity.
   * @param {number} threshold - The new threshold value.
   * @throws {Error} Throws an error if an issue occurs.
   * @private
   */
  private setThreshold(threshold: number) {
    try {
      this.threshold = threshold;
    } catch (error: any) {
      throw new Error(`Error setting threshold: ${error.message}`);
    }
  }

  /**
   * Gets the current threshold for location timestamp validity.
   * @returns {number} The current threshold.
   * @throws {Error} Throws an error if an issue occurs.
   * @private
   */
  private getThreshold() {
    try {
      return this.threshold;
    } catch (error: any) {
      throw new Error(`Error getting threshold: ${error.message}`);
    }
  }

  /**
   * Gets the operating system identifier.
   * @returns {string} The operating system identifier.
   * @throws {Error} Throws an error if an issue occurs.
   * @private
   */
  private getOS() {
    try {
      switch (Platform.OS) {
        case 'ios':
          return 'ios';
        case 'android':
          return 'android';
        default:
          return 'unknown';
      }
    } catch (error: any) {
      throw new Error(`Error getOS : ${error.message}`);
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
        if(location === null) this.getLocation();
      }
    } catch (error: any) {
      throw new Error(`Error initialize Location Service: ${error.message}`);
    }
  }

  /**
   * Gets the current time in milliseconds.
   * @returns {number} The current timestamp.
   * @throws {Error} Throws an error if an issue occurs.
   * @private
   */
  private getCurrentTime() {
    try {
      const timestampInMilliseconds = Date.now();
      return timestampInMilliseconds;
    } catch (error: any) {
      throw new Error(`Error get Current time: ${error.message}`);
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
   * Checks if the time difference is within the threshold.
   * @param {number} oldTime - The old timestamp.
   * @returns {boolean} True if within threshold, false otherwise.
   * @throws {Error} Throws an error if an issue occurs.
   * @private
   */
  private async checkThreshold(oldTime: number) {
    try {
      const difference = Date.now() - oldTime;
      if (difference < this.threshold) {
        return true;
      } else {
        return false;
      }
    } catch (error: any) {
      throw new Error(`Error check threshold: ${error.message}`);
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
          title: 'Geolocation Permission',
          message: 'Can we access your location?',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      console.log('granted', granted);
      if (granted === 'granted') {
        console.log('You can use Geolocation');
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
  public async getLocation() {
    Geolocation.getCurrentPosition(
      async position => {
        console.log(position);
        const dataSaved = await this.saveLocationToCache(position.coords);
        this.location = position;
        //await this.sendLocationToServer(position);
        console.log('location data is cached: ', dataSaved);
      },
      async error => {
        this.location = undefined;
        const cachedLocation = await this.getCachedLocation();
        if (cachedLocation) {
          console.log(cachedLocation);
        }
        throw new Error(error.message);
      },
      { enableHighAccuracy: true, timeout: 1500, maximumAge: 10000 },
    );

    console.log(this.location);
  }

  //retrieves the chached location only if the infomation is new enough based on the threshold specified in instatiation.
  /**
   * Retrieves the cached location if it's recent, otherwise fetches a new location.
   * @returns {Promise<GeoCoordinates|null>} The cached location or null if not found.
   * @throws {Error} Throws an error if an issue occurs.
   * @private
   */
  private async getCachedLocation() {
    try {
      const cachedLocation = await EncryptedStorage.getItem('cachedLocation');
      if (cachedLocation) {
        const { timestamp, latitude, longitude } = JSON.parse(cachedLocation);
        const timeOK = this.checkThreshold(timestamp);
        if (await timeOK) {
          console.log(cachedLocation);
          return { latitude, longitude };
        }
        return this.getLocation();
      } else {
        console.log('Could not find chached location info');
        return null;
      }
    } catch (error: any) {
      console.log('Error happened at getCachedLocation().', error.message);
      return undefined;
    }
  }

  //Everytime the location is newly retrieved, the position and timestamp is stored in the encrypted storage as JSON format.
  /**
   * Saves the current location to encrypted storage.
   * @param {GeoCoordinates} position - The current location.
   * @returns {Promise<boolean>} True if saved successfully, false otherwise.
   * @throws {Error} Throws an error if an issue occurs.
   * @private
   */
  private async saveLocationToCache(
    position: GeoCoordinates,
  ): Promise<Boolean> {
    let locationWithTimestamp: {
      timestamp: number;
      latitude: number;
      longitude: number;
    };

    try {
      locationWithTimestamp = {
        timestamp: this.getCurrentTime(),
        latitude: position.latitude,
        longitude: position.longitude,
      };
      const stringifiedLocation = JSON.stringify(locationWithTimestamp);
      await EncryptedStorage.setItem('cachedLocation', stringifiedLocation);
      return true;
    } catch (error: any) {
      console.log('Error happened at saveLocationToCache(): ', error.message);
      return false;
    }
  }

  /**
   * Sends the device's location to a server.
   * @param {GeoPosition} position - The device's current location.
   * @returns {Promise<void>}
   * @throws {Error} Throws an error if an issue occurs.
   */
  public async sendLocationToServer(position: GeoPosition): Promise<void> {
    try {
      const apiUrl = 'https://10.0.2.2:8000/???';
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }),
      });

      if (response.ok) {
        console.log('Location data sent to server successfully');
      } else {
        console.error('Failed to send location data to server');
      }
    } catch (error) {
      throw new Error('Error sending location data to server');
    }
  }
}

export default LocationService;
