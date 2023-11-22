// import { render, renderHook } from '@testing-library/react-native';
// import React from 'react';
// import { act } from 'react-test-renderer'; // Use React Test Renderer for async testing
// import useLocationService from '../src/components/LocationService';
// import { GeoPosition } from 'react-native-geolocation-service';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// jest.mock('@react-native-async-storage/async-storage', () => ({
//   getItem: jest.fn(),
//   setItem: jest.fn(),
// }));

// jest.mock('react-native-geolocation-service', () => ({
//   getCurrentPosition: jest.fn(),
// }));

// describe('LocationService', () => {
//   it('should retrieve cached location from AsyncStorage', async () => {
//     const mockedCachedLocation: GeoPosition = {
//       coords: {
//         latitude: 40.7128,
//         longitude: -74.0060,
//         accuracy: 0,
//         altitude: null,
//         heading: null,
//         speed: null
//       },
//       timestamp: 0,
//     };

//     (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(mockedCachedLocation);

//     let result: any;

//     expect((AsyncStorage.getItem as jest.Mock)).toHaveBeenCalledWith('lastLocation');

//     // Make assertions based on the result
//     expect(result.current.location).toEqual(mockedCachedLocation);
//   });

//   it('should send location to the server', async () => {
//     const mockPosition: GeoPosition = {
//       coords: {
//         latitude: 10.123,
//         longitude: -20.456,
//         accuracy: 0,
//         altitude: null,
//         heading: null,
//         speed: null
//       },
//       timestamp: 0,
//     };

//     (global as any).fetch = jest.fn().mockResolvedValueOnce({ ok: true });

//     let result: any;

    

//     // Call the function that sends location to the server
//     await act(async () => {
//       result.current.sendLocationToServer(mockPosition);
//     });

//     // Make assertions based on the result
//     expect(global.fetch).toHaveBeenCalledWith(
//       'https://10.0.2.2:8000/ads/location',
//       expect.objectContaining({
//         method: 'POST',
//         body: JSON.stringify({
//           latitude: 10.123,
//           longitude: -20.456,
//         }),
//       })
//     );
//   });
// });
