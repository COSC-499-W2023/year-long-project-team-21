import { PermissionsAndroid } from 'react-native';

/**
 * Requests location permission from the user.
 *
 * This function prompts the user to grant permission for accessing their device's fine location.
 *
 * @async
 * @function
 * @returns {Promise<boolean>} A promise that resolves to `true` if the permission is granted, and `false` otherwise.
 *
 * @example
 * // Example usage:
 * const isPermissionGranted = await requestLocationPermission();
 * if (isPermissionGranted) {
 *   // Perform actions that require location permission
 * } else {
 *   // Handle the case where the user denied location permission
 * }
 */
const requestLocationPermission = async () => {
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
    } else {
      console.log('You cannot use Geolocation');
      return false;
    }
  } catch (err) {
    return false;
  }
};

export default requestLocationPermission;
