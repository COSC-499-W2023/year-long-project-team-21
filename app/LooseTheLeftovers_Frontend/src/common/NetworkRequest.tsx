import axios from 'axios';
import { AxiosInstance, AxiosRequestConfig } from 'axios';
import {
  retrieveUserSession,
  removeUserSession,
  storeUserSession,
} from '../../src/common/EncryptedSession';

const BASE_URL: string = 'http://10.0.2.2:8000/';

/**
 * Function to configure Axios request defaults.
 * @returns {AxiosRequestConfig} - The configuration object for Axios.
 */
export function djangoConfig(): AxiosRequestConfig {
  const config: AxiosRequestConfig = {
    baseURL: BASE_URL,
    timeout: 1500,
  };
  return config;
}

/**
 * Handles errors generated by Axios requests.
 *
 * This function provides a standardized way of handling common Axios errors, including timeouts and
 * HTTP status code based errors. It uses a mapping of status codes to custom error messages for
 * enhanced error reporting.
 *
 * @param {unknown} error - The error thrown by Axios or other parts of the code.
 * @param {Record<string, string>} customErrorMessages - A map of HTTP status codes to custom error messages.
 * @throws {Error} Throws a more descriptive error based on the Axios error or a general error message.
 */
export function handleAxiosError(
  error: unknown,
  customErrorMessages: Record<string, string>,
): void {
  // throw error as it is if it is not an axios error as an early return
  if (!axios.isAxiosError(error)) {
    throw new Error(
      `Error: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
  // Extract HTTP response and retrieve status pending existance
  const status = error.response?.status;
  // If status and message for that status is defined
  if (status && customErrorMessages[status]) {
    // throw error
    throw new Error(customErrorMessages[status]);
  }
  // If the global timeout has been exceeded, throw an error describing difficulty communicating with server
  if (error.message === 'timeout of 5000ms exceeded') {
    throw new Error('Network error, try again later');
  }
  // Throw general error message
  throw new Error(`Axios error: ${error.message}`);
}

/**
 * Class representing secure API requests with session management.
 */
export class SecureAPIReq {
  // will need to check if the user is signed in. Throw an error in the constructor if the user is not logged in.

  private TOKEN_EXPIREY: number;
  private REFRESH_EXPIREY: number;

  private instance: AxiosInstance;
  private currentSesh: any;

  /**
   * Constructor for SecureAPIReq class.
   * @param {any} session - The user's session information.
   * @param {string} [baseUrl] - The base URL for API requests. Defaults to BASE_URL.
   */
  constructor(session: any, baseUrl?: string) {
    // this should change to redirecting the user to login or something fine for now
    if (session === null)
      throw new Error('Error: login before requesting private endpoint');
    // assign session to object so we have reference to it
    this.currentSesh = session;
    // init instance
    this.instance = axios.create({
      baseURL: baseUrl || BASE_URL,
      timeout: 1500,
      validateStatus: function (status) {
        // Define which status codes should resolve and which should reject
        return status >= 200 && status < 300; // default behavior for 2xx codes
      },
    });
    // 4.5 minutes (auth tokens are set to expire in 5 minutes)
    this.TOKEN_EXPIREY = 270000;
    // 23hours and 50 minutes (ref tokens are set to expire every 24hrs)
    this.REFRESH_EXPIREY = 85800000;
  }

  /**
   * Factory method to create an instance of SecureAPIReq.
   * @param {string} [baseUrl] - The base URL for API requests. Optional.
   * @returns {Promise<SecureAPIReq>} - An instance of SecureAPIReq.
   */
  public static async createInstance(baseUrl?: string) {
    const session = await retrieveUserSession();
    return new SecureAPIReq(session, baseUrl);
  }

  /**
   * Performs a GET request.
   * @param {string} endpoint - The API endpoint.
   * @param {{[key: string]: any}} [params] - Query parameters for the request. Optional.
   * @returns {Promise<any>} - The response from the GET request.
   * @throws {Error} - Throws an error if the request fails.
   */
  public async get(endpoint: string, params?: { [key: string]: any }) {
    try {
      const headers = await this.createSecureHeader();
      return this.instance.get(endpoint, { params, headers });
    } catch (e) {
      throw new Error(`${(e as Error).message}`);
    }
  }

  /**
   * Performs a POST request.
   * @param {string} endpoint - The API endpoint.
   * @param {any} [body] - The request body. Optional.
   * @param {{[key: string]: any}} [params] - Query parameters for the request. Optional.
   * @param {boolean} [asFormEncoded] - Whether to send the request as form-encoded. Optional.
   * @returns {Promise<any>} - The response from the POST request.
   * @throws {Error} - Throws an error if the request fails.
   */
  public async post(
    endpoint: string,
    body?: any,
    params?: { [key: string]: any },
    asFormEncoded?: boolean,
  ) {
    try {
      const headers = await this.createSecureHeader();
      const options = { params, headers };
      // encode post body message if asFormEnced is true
      if (asFormEncoded && body) {
        const bodyParams = new URLSearchParams();
        for (const b of Object.keys(body)) {
          bodyParams.append(b, body[b]);
        }
        body = bodyParams;
      }
      return this.instance.post(endpoint, body, options);
    } catch (e) {
      throw new Error(`${(e as Error).message}`);
    }
  }

  /**
   * Performs a PUT request.
   * @param {string} endpoint - The API endpoint.
   * @param {any} [body] - The request body. Optional.
   * @param {{[key: string]: any}} [params] - Query parameters for the request. Optional.
   * @returns {Promise<any>} - The response from the PUT request.
   * @throws {Error} - Throws an error if the request fails.
   */
  public async put(
    endpoint: string,
    body?: any,
    params?: { [key: string]: any },
  ) {
    try {
      const headers = await this.createSecureHeader();
      return this.instance.put(endpoint, body, { params, headers });
    } catch (e) {
      throw new Error(`${(e as Error).message}`);
    }
  }

  /**
   * Performs a DELETE request.
   * @param {string} endpoint - The API endpoint.
   * @param {{[key: string]: any}} [params] - Query parameters for the request. Optional.
   * @returns {Promise<any>} - The response from the DELETE request.
   * @throws {Error} - Throws an error if the request fails.
   */
  public async delete(endpoint: string, params?: { [key: string]: any }) {
    try {
      const headers = await this.createSecureHeader();
      return this.instance.delete(endpoint, { params, headers });
    } catch (e) {
      throw new Error(`${(e as Error).message}`);
    }
  }

  /**
   * Creates secure headers for requests.
   * @private
   * @returns {Promise<Object>} - The headers object.
   * @throws {Error} - Throws an error if headers cannot be created.
   */
  private async createSecureHeader() {
    // init empty header
    let headers = {};
    try {
      // retrieve header from handleExpirey
      const token: string = await this.handleExpirey();
      // if token is truthy, assign header
      if (token) {
        headers = {
          Authorization: `Bearer ${token}`,
        };
        return headers;
      }
      // else, throw an error
      throw new Error('Errror in createSecureHeader: blank token');
    } catch (e) {
      // throw an error if any problems arise.
      throw new Error(`Error in createSecureHeader: ${(e as Error).message}`);
    }
  }

  /**
   * Handles token expiry and refreshes the token if necessary.
   * @private
   * @returns {Promise<string>} - An authentication token.
   * @throws {Error} - Throws an error if unable to refresh token.
   */
  private async handleExpirey() {
    // check if auth token is expired
    const token_nExpired = this.checkToken(this.TOKEN_EXPIREY);
    // if not expired, return the auth token
    if (token_nExpired) return this.currentSesh['token'];
    // refresh authentication token or throw an error if refresh is expired.
    const ref_nExpired = this.checkToken(this.REFRESH_EXPIREY);
    if (ref_nExpired) {
      // Refresh token is still valid, generate a new auth token
      const new_token: string = await this.getNewToken();
      return new_token;
    } else {
      // refresh token is not valid, get the user to re-authenticate
      throw new Error('Authentication failed. Must log back in again');
    }
  }

  /**
   * Checks if a token is expired based on a given threshold.
   * @private
   * @param {number} threshold - The time threshold for token expiry.
   * @returns {boolean} - True if the token is still valid, false otherwise.
   * @throws {Error} - Throws an error if no session is found.
   */
  private checkToken(threshold: number) {
    // throw error if session is null
    if (this.currentSesh == null) {
      throw new Error('No tokens in storage');
    }
    // retrieve token_creation timestamp
    const creationTime = this.currentSesh['token_creation'];
    // get current time in miliseconds
    const currentTime = Date.now();
    // compare with creation
    let result = currentTime - creationTime < threshold;
    // return result based on truthiness
    return result ? true : false;
  }

  /**
   * Private method to retrieve a new authentication token and save it to encrypted storage.
   * @private
   * @returns {Promise<string>} The new authentication token.
   * @throws {Error} If there's a problem in retrieving the authentication token or if the response is blank.
   */
  private async getNewToken() {
    // retrieve refresh token
    const refreshToken = this.currentSesh['refresh_token'];
    const endpoint: string = 'users/tokens/refresh/';
    try {
      // @TODO efficiency concerns awaiting removeUserSession and storeUserSession.
      // make a request to refresh token
      const response = await this.instance.post(endpoint, {
        refresh: refreshToken,
      });
      // retrieve access token fron the response
      const token: string = response.data['access'];
      if (!token)
        throw new Error(
          'Error in retrieving authentication token: blank response',
        );
      // Clear any existing user session before storing the new one
      await removeUserSession();
      // Store the new user session
      await storeUserSession(token, refreshToken);
      // return
      return token;
    } catch (e) {
      throw new Error(
        `Problem retrieving access token: ${(e as Error).message}`,
      );
    }
  }
}
