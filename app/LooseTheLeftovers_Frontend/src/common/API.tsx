// BASE_URL, loopback for android devices
export const BASE_URL: string = 'http://10.0.2.2:8000';
// export const BASE_URL: string = 'http://192.168.1.225:8000';

// endpoint for logging in (retrieving auth token)
export const loginEndpoint: string = '/users/tokens/';

// endpoint for refresh token
export const refEndpoint: string = '/users/tokens/refresh/';

// endpoint for requesting a token for password reset
export const passReset: string = '/users/password_reset/';

// endpoint for password reset token verification
export const resetTKVF: string = '/users/password_reset/validate_token/';

// endpoint for completing password reset
export const confirmReset: string = '/users/password_reset/confirm/';

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

// endpoint for users
export const users: string = '/users/';

// endpoint for last messages
export const messages: string = '/messages/';

// endpoint for ratings
export const ratings: string = '/ratings/';
