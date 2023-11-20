// // __tests__/LocationService.test.tsx

// import React from 'react';
// import { render, waitFor } from '@testing-library/react-native';
// import LocationService from '../src/components/LocationService'; // Adjust the path as needed

// // Mock AsyncStorage
// jest.mock('@react-native-async-storage/async-storage', () => ({
//   getItem: jest.fn(),
//   setItem: jest.fn(),
// }));

// // Mock Geolocation
// jest.mock('react-native-geolocation-service', () => ({
//   getCurrentPosition: jest.fn(),
// }));

// // Mock requestLocationPermission
// jest.mock('../LocationPermission', () => ({
//   __esModule: true,
//   default: jest.fn().mockResolvedValue(true), // Adjust the resolved value based on your needs
// }));

// describe('LocationService', () => {
//   it('declared without crashing', async () => {
//     // Ensure that the component renders without crashing
//   });

//   it('fetches and displays location data', async () => {
//     render(<LocationService />);

//     // Mock the response from Geolocation
//     const mockPosition = {
//       coords: {
//         latitude: 40.7128,
//         longitude: -74.006,
//       },
//     };
//     // Resolve the getCurrentPosition mock with the mocked position
//     // Adjust the mockReturnValueOnce arguments based on your needs
//     (global as any).navigator.geolocation.getCurrentPosition.mockReturnValueOnce(
//       Promise.resolve(mockPosition)
//     );

//     // Wait for the component to render and the location to be displayed
//     await waitFor(() => expect(getLocationText()).toBe(`Current location: ${JSON.stringify(mockPosition)}`));

//     // You might want to add more assertions based on your specific requirements
//   });

//   // Add more test cases based on your component's behavior
// });

