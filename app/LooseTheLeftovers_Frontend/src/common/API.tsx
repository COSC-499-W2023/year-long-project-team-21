// BASE_URL, loopback for android devices
export const BASE_URL: string = 'http://10.0.2.2:8000';

// endpoint for logging in (retrieving auth token)
export const loginEndpoint: string = '/users/tokens/';

// endpoint for refresh token
export const refEndpoint: string = '/users/tokens/refresh/';

// endpoint for ads
export const adEndpoint: string = '/ads/';

// endpoint for ads/categories
export const adCategories: string = '/ads/categories/';

// endpoint for ads/location/
export const adsLocation: string = '/ads/location/';

// endpoint for ads/location/categories
export const adsLocationCategories: string = '/ads/categories/location';

// endpoint for individual user's ad
export const usersAds: string = '/ads/users/';

// endpoitn for users
export const users: string = '/users/';
