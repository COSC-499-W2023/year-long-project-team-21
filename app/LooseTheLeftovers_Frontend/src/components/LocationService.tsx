import React, { useEffect, useState } from 'react';
import Geolocation, { GeoPosition } from 'react-native-geolocation-service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, PermissionsAndroid } from 'react-native';

/**
 * Manages location-related functionalities, including permission handling,
 * caching, and sending location data to the server.
 *
 * @function
 * @returns {Object} An object containing the current location and a function to send location data to the server.
 *
 * @example
 * // Example usage:
 * const { location, sendLocationToServer } = LocationService();
 * console.log('Current location:', location);
 * sendLocationToServer(location);
 */
const LocationService = () => {
  const [location, setLocation] = useState<GeoPosition | undefined>(undefined);
  const [hasPermission, setHasPermission] = useState<boolean>(false);

  useEffect(() => {
    LocationLogic();
  }, []);

  /**
   * Retrieves cached location from AsyncStorage.
   *
   * @async
   * @function
   * @returns {Promise<void>} A promise that resolves when the cached location is retrieved.
   */
  const getCachedLocation = async () => {
    console.log('Get Location from strage start');

    try {
      const cachedLocation = await AsyncStorage.getItem('lastLocation');
      if (cachedLocation !== null) {
        const parsedLocation = JSON.parse(cachedLocation);
        setLocation(parsedLocation);
        console.log('Cached location:', parsedLocation);
        return parsedLocation;
      } else {
        console.log('No cached location found.');
        return null;
      }
    } catch (error) {
      console.log('Error retrieving location from cache:', error);
      return null;
    }
  };

  /**
   * Saves the provided location to AsyncStorage as a cached location.
   *
   * @async
   * @function
   * @param {GeoPosition} position - The location data to be saved.
   * @returns {Promise<void>} A promise that resolves when the location is saved to AsyncStorage.
   */
  const saveLocationToCache = async (position: GeoPosition) => {
    console.log('Save Location to strage start');
    try {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const stringifiedLocation = JSON.stringify({ latitude, longitude });
      await AsyncStorage.setItem('lastLocation', stringifiedLocation);
    } catch (error) {
      console.error('Error saving location to cache: ', error);
    }
  };

  /**
   * Sends the provided location data to the server via a POST request.
   *
   * @async
   * @function
   * @param {GeoPosition} position - The location data to be sent to the server.
   */
  const sendLocationToServer = async (position: GeoPosition | undefined) => {
    console.log('Send Location start');
    try {
      const apiUrl = 'https://10.0.2.2:8000/ads/location';

      // Use optional chaining to access properties safely
      const latitude = position?.coords?.latitude;
      const longitude = position?.coords?.longitude;

      if (latitude !== undefined && longitude !== undefined) {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            latitude,
            longitude,
          }),
        });

        if (response.ok) {
          console.log('Location data sent to server successfully');
        } else {
          console.error('Failed to send location data to server');
        }
      } else {
        console.error('Invalid or undefined position data');
      }
    } catch (error) {
      console.error('Error sending location data to server: ', error);
    }
  };

  /**
   * Retrieves the current location, requests location permission if necessary,
   * and updates the state with the obtained location.
   * @param {boolean} permission
   * @returns true if it could get location, otherwise false.
   */
  const getLocation = (permission: boolean): Promise<boolean> => {
    return new Promise<boolean>(resolve => {
      console.log('Get Location start');
      const result = permission;
      console.log('permission is: ', result);

      if (result) {
        Geolocation.getCurrentPosition(
          position => {
            console.log(position);
            setHasPermission(true);
            setLocation(position);
            saveLocationToCache(position);
            resolve(true);
            console.log('get location done');
          },
          error => {
            console.log(error.code, error.message);
            setHasPermission(false);
            getCachedLocation();
            resolve(false);
          },
          { enableHighAccuracy: true, timeout: 1500, maximumAge: 10000 },
        );
      } else {
        resolve(false);
      }

      console.log('hello here');
    });
  };

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
    console.log('request permission start');
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
  const LocationLogic = async () => {
    // mount cached location to location.
    const cachedLocation = await getCachedLocation();

    if (cachedLocation) {
      console.log('Cached location found. Sending to server.');
      //sendLocationToServer(cachedLocation);
    } else {
      console.log('No cached location found. Requesting permission.');
      const permissionStatus = await requestLocationPermission();
      if (permissionStatus) {
        getLocation(true);
      } else {
        console.log('Location permission denied.');
      }
    }
  };
  return{location, sendLocationToServer};
};

export default LocationService;
