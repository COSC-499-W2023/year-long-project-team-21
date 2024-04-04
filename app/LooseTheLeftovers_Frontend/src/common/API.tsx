// BASE_URL, loopback for android devices
// export const BASE_URL: string = 'http://10.0.2.2:8000';
export const BASE_URL: string = 'http://192.168.1.224:8000';

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

// endpoint for create ad
export const adEndpoint: string = '/ads/';

// endpoint for individual user's ad
export const usersAds: string = '/ads/users/';

// endpoint for users
export const users: string = '/users/';

export const messages: string = '/messages/';
