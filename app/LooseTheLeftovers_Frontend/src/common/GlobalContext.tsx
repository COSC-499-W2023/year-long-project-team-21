import React, { createContext, useContext, useState, ReactNode } from 'react';
import { GlobalContextType } from './Types';

const GlobalContext = createContext<GlobalContextType>({} as GlobalContextType);

/**
 * The purpose of this class is to avoid prop drilling with the SplashScreen. Nec value is loaded there and then is accessible in all of the screens
 *
 *
 *
 *
 *
 *
 *  */
export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [firstLaunch, setFirstLaunch] = useState<boolean | null>(null);
  const [locationPermission, setLocationPermission] = useState('');

  const updateFirstLaunch = (value: boolean) => {
    setFirstLaunch(value);
  };

  const updateLocationPermission = (value: string) => {
    setLocationPermission(value);
  };

  return (
    <GlobalContext.Provider
      value={{
        firstLaunch,
        locationPermission,
        updateFirstLaunch,
        updateLocationPermission,
      }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => useContext(GlobalContext);
