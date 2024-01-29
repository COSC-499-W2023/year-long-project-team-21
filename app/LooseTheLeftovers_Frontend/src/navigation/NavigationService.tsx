/**
 * @module NavigationService
 * @description Provides navigation utilities for the application using React Navigation.
 */

import { createRef } from 'react';
import { NavigationContainerRef } from '@react-navigation/native';

/**
 * Reference to the navigation container.
 * @type {React.RefObject<NavigationContainerRef>}
 */
export const navigationRef = createRef<NavigationContainerRef>();

/**
 * Navigate to a specific screen within the application.
 * @param {string} name - The name of the screen to navigate to.
 * @param {object} [params] - Optional parameters to pass to the screen being navigated to.
 * @returns {void}
 * @function
 * @name navigate
 * @memberof module:NavigationService
 * @example
 * // Navigate to the "Home" screen
 * navigate('Home');
 *
 * // Navigate to the "Profile" screen with parameters
 * navigate('Profile', { userId: 123 });
 */
export function navigate(name: any, params?: any) {
  navigationRef.current?.navigate(name, params);
}
