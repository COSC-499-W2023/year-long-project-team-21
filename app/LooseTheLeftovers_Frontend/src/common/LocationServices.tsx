import Geolocation, {
  GeoCoordinates,
  GeoPosition,
} from 'react-native-geolocation-service';
import { Alert, Linking, PermissionsAndroid, Platform } from 'react-native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

/** 
 * I just feel that LocationService is too complex for what we need. I want to try and see if I can simplify it. I don't think we need a class... 
 * I will write tests after I get everything that I need. I'm just kinda winging this one... 
 * My thoughts are though that I can save some preferences here: 
 *          - whether they want to never use it agian
 *          - 


/**
   * Opens the device settings for the app.
   * @throws {Error} Throws an error if an issue occurs.
   * @private
   */
export function openSettings() {
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
export async function getLocationPermissionIOS() {
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
      return false;
    } else if (result === RESULTS.BLOCKED) {
      console.log('Geolocation permission denied and blocked');
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

export async function getLocationPermissionAndroid() {
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
    console.log('this is granted: ' + granted);
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Location permission granted.');
      return true;
    } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      Alert.alert('Location Services must be enabled');
      return false;
    } else {
      console.log('Location permission denied or not answered yet.');
      return false;
    }
  } catch (error) {
    console.log(`Error getLocationPermissionAndroid: ${error}`);
    throw new Error(
      `An error occurred while requesting location permission: ${error}`,
    );
  }
}

// likely could use a handler here to depcipher between IOS and android device
// this needs to be tested
export async function checkLocationPermission() {
  try {
    const result = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    switch (result) {
      case RESULTS.UNAVAILABLE:
        return 'UNAVAILABLE';
      case RESULTS.DENIED:
        return 'DENIED';
      case RESULTS.LIMITED:
        return 'LIMITED';
      case RESULTS.GRANTED:
        return 'GRANTED';
      case RESULTS.BLOCKED:
        return 'BLOCKED';
    }
  } catch (error) {
    return error;
  }
}

export async function getLocation(): Promise<{
  latitude: number;
  longitude: number;
}> {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        resolve({ latitude, longitude });
      },
      error => {
        // Reject the promise if there's an error
        reject(new Error(error.message));
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  });
}
