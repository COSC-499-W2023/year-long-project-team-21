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
    console.log('this is granted ' + granted);
    if (granted === 'granted') {
      return true;
    } else if (granted == 'never_ask_again') {
      console.log('The user denied to be asked again.');
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

// likely could use a handler here to depcipher between IOS and android device
export async function checkLocationPermission() {
  try {
    const result = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    switch (result) {
      case RESULTS.UNAVAILABLE:
        console.log(
          'This feature is not available (on this device / in this context)',
        );
        return 'UNAVAILABLE';
      case RESULTS.DENIED:
        console.log(
          'The permission has not been requested / is denied but requestable',
        );
        return 'DENIED';
      case RESULTS.LIMITED:
        console.log('The permission is limited: some actions are possible');
        return 'LIMITED';
      case RESULTS.GRANTED:
        console.log('The permission is granted');
        return 'GRANTED';
      case RESULTS.BLOCKED:
        console.log('The permission is denied and not requestable anymore');
        return 'BLOCKED';
    }
  } catch (error) {
    // …handle the error accordingly
    console.error(error);
    return error;
  }
}
