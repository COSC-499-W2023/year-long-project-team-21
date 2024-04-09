import Geolocation from 'react-native-geolocation-service';
import { Linking, PermissionsAndroid, Platform } from 'react-native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

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
 * Asks location permission on Android.
 * @returns {Promise<boolean>} True if permission granted, false otherwise.
 * @throws {Error} Throws an error if an issue occurs.
 */
export async function getLocationPermission() {
  try {
    if (Platform.OS === 'android') {
      const permissions = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      ]);

      const fineLocationGranted =
        permissions[PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION] ===
        PermissionsAndroid.RESULTS.GRANTED;
      const coarseLocationGranted =
        permissions[PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION] ===
        PermissionsAndroid.RESULTS.GRANTED;

      return fineLocationGranted || coarseLocationGranted;
    } else if (Platform.OS === 'ios') {
      // Request appropriate iOS permission
      // Choose between WHEN_IN_USE or ALWAYS based on your app's requirement
      const permissionResult = await request(
        PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      );

      return permissionResult === RESULTS.GRANTED;
    }
  } catch (error) {
    console.error(`Error getLocationPermission: ${error}`);
    throw new Error(
      `An error occurred while requesting location permissions: ${error}`,
    );
  }
}

/**
 * Checks the location permission status for the application on the current platform.
 *
 * This function determines the current location permission status by checking the appropriate
 * permission based on the platform (Android or iOS). For Android, it checks for `ACCESS_FINE_LOCATION`.
 * For iOS, it checks for `LOCATION_WHEN_IN_USE` (you can change this to `LOCATION_ALWAYS`
 * based on your app's requirement). The function returns a string representing the permission status.
 *
 * @returns {Promise<string>} A promise that resolves with a string representing the current permission status.
 * Possible return values are 'UNAVAILABLE', 'DENIED', 'LIMITED', 'GRANTED', 'BLOCKED', or 'UNKNOWN'.
 * If an error occurs, the promise resolves with the error object.
 */
export async function checkLocationPermission() {
  try {
    let permission: any;
    if (Platform.OS === 'android') {
      permission = PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
    } else if (Platform.OS === 'ios') {
      // Choose the appropriate iOS permission for your app
      permission = PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
      // For always permission, use PERMISSIONS.IOS.LOCATION_ALWAYS
    }

    const result = await check(permission);
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
      default:
        return 'UNKNOWN'; // A safety case for unknown results
    }
  } catch (error) {
    return error;
  }
}

/**
 * Retrieves the current geographic location of the device.
 *
 * This function asynchronously obtains the device's current geographic location using the Geolocation API.
 * It returns a promise that resolves with the latitude and longitude of the device. If the location cannot be
 * retrieved due to an error (e.g., permission issues, location services disabled), the promise is rejected
 * with an error message.
 *
 * @returns {Promise<{latitude: number, longitude: number}>} A promise that resolves with an object containing
 * the latitude and longitude of the device's current location.
 */
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
