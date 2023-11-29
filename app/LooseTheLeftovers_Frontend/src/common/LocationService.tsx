import Geolocation, {
  GeoCoordinates,
  GeoPosition,
} from 'react-native-geolocation-service';
import { Alert, Linking, PermissionsAndroid, Platform } from 'react-native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import EncryptedStorage from 'react-native-encrypted-storage';

class LocationService {
  location: GeoPosition | undefined;
  hasPermission: boolean | null;
  os: string;

  constructor(private threshold: number) {
    this.location = undefined;
    this.hasPermission = false;
    this.os = this.getOS();
  }

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
  public async initializeLocationService() {
    if (this.os === 'android')
      this.hasPermission = await this.getLocationPermissionAndroid();
    else this.hasPermission = await this.getLocationPermissionIOS();

    if (this.hasPermission) {
      await this.getCachedLocation();
    }
  }

  private getCurrentTime() {
    const timestampInMilliseconds = Date.now();
    return timestampInMilliseconds;
  }

  private async openSettings() {
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings');
    } else {
      Linking.openSettings();
    }
  }

  private async checkThreshold(oldTime: number) {
    const difference = Date.now() - oldTime;
    if (difference < this.threshold) {
      return true;
    } else {
      return false;
    }
  }
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
    } catch (err) {
      console.log('Error happened at getLocationPermissionIOS()', err);
      return false;
    }
  }

  //asks location permission. Returns boolean value depending on the status.
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
    } catch (err) {
      console.log('Error happened at getLocationPermission()');
      return false;
    }
  }

  //When the user denied the permission (never ask again status), we beg to change the setting with this function.
  public async promptToChangeLocationSettings() {
    const message =
      'To use this app, please enable location permissions in settings.';

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
  }

  //get current user device's location, it will call saveLocationToCache if the location is successfully retrieved.
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
        console.log(error.code, error.message);
        this.location = undefined;
        const cachedLocation = await this.getCachedLocation();
        if (cachedLocation) {
          console.log(cachedLocation);
        }
      },
      { enableHighAccuracy: true, timeout: 1500, maximumAge: 10000 },
    );

    console.log(this.location);
  }

  //retrieves the chached location only if the infomation is new enough based on the threshold specified in instatiation.
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
    } catch (error) {
      console.error('Error getting cached location: ', error);
      return undefined;
    }
  }

  //Everytime the location is newly retrieved, the position and timestamp is stored in the encrypted storage as JSON format.
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
    } catch (error) {
      console.error('Error saving location to cache: ', error);
      return false;
    }
  }

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
      console.error('Error sending location data to server: ', error);
    }
  }
}

export default LocationService;
