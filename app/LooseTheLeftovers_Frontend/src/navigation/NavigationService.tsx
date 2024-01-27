// NavigationService.js
import { createRef } from 'react';
import { NavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createRef<NavigationContainerRef>();

export function navigate(name: any, params?:any) {
  navigationRef.current?.navigate(name, params);
}


