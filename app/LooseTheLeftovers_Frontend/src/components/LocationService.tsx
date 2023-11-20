import React, { useEffect, useState } from 'react';
import requestLocationPermission from './LocationPermission';
import Geolocation, { GeoPosition } from 'react-native-geolocation-service';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  const [location, setLocation] = useState<GeoPosition | boolean>(false);

  /**
   * Retrieves cached location from AsyncStorage.
   *
   * @async
   * @function
   * @returns {Promise<void>} A promise that resolves when the cached location is retrieved.
   */
  const getCachedLocation = async () => {
    try {
      const cachedLocation = await AsyncStorage.getItem('cahcedLocation');
      if (cachedLocation) {
        const parsedLocation = JSON.parse(cachedLocation);
        setLocation(parsedLocation);
      }
    } catch (error) {
      console.error('Error getting cached location: ', error);
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
    try {
      const stringifiedLocation = JSON.stringify(position);
      await AsyncStorage.setItem('cachedLocation', stringifiedLocation);
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
   * @returns {Promise<void>} A promise that resolves when the location data is sent to the server.
   */
  const sendLocationToServer = async (position: GeoPosition) => {
    try {
      const apiUrl = 'https://10.0.2.2:8000/???';
      const reposnse = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }),
      });
      if (reposnse.ok) {
        console.log('Location data sent to server successfully');
      } else {
        console.error('Failed to send location data to server');
      }
    } catch (error) {
      console.error('Error sending location data to server: ', error);
    }
  };

  /**
   * Retrieves the current location, requests location permission if necessary,
   * and updates the state with the obtained location.
   */
  const getLocation = () => {
    const result = requestLocationPermission();
    result.then(res => {
      console.log('res is: ', res);
      if (res) {
        Geolocation.getCurrentPosition(
          position => {
            console.log(position);
            setLocation(position);
            saveLocationToCache(position);
          },
          error => {
            console.log(error.code, error.message);
            setLocation(false);
            getCachedLocation();
          },
          { enableHighAccuracy: true, timeout: 1500, maximumAge: 10000 },
        );
      }
    });
    console.log(location);
  };

  useEffect(() => {
    getLocation();
  }, []);

  return { location, sendLocationToServer };
};

export default LocationService;
