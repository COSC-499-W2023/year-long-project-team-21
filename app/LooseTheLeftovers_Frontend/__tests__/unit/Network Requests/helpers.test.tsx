import { SecureAPIReq } from '../../../src/common/NetworkRequest';
import EncryptedStorage from 'react-native-encrypted-storage';
import mockStorage from '../../../__mocks__/react-native-encrypted-storage';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

/*
 *   This file tests the private helper methods in NetworkRequests.tsx
 *   I recognize that casting private methods like this (newReq as any).checkToken(token_exp);
 *   is considered bad practice and that tests on private functions should be done implicitly,
 *   but due to the nature of the complexity of this class, I wanted to test as I go.
 */

jest.mock('axios', () => {
  return {
    ...(jest.requireActual('axios') as object),
    create: jest.fn().mockReturnValue(jest.requireActual('axios')),
  };
});

const mockAdapter = new MockAdapter(axios);

describe('Test if helper methods are working correctly for Network Requests', () => {
  // global constants
  const token_exp = 270000;
  const refresh_exp = 85800000;
  // clear all mocks
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('check if checkToken() returns true if auth token has not expired', async () => {
    try {
      // create new NetworkRequest object using factory method
      const newReq = await SecureAPIReq.createInstance();
      // Kind of a hack to call private functions this way...
      const result = (newReq as any).checkToken(token_exp);
      // expect the result to be true
      expect(result).toBe(true);
    } catch (e) {
      console.log('Error ocurred: ', e);
      throw new Error(
        `An excpetion occured in the try block: ${(e as Error).message}`,
      );
    }
  });
  it('check if checkToken() returns false if auth token has expired', async () => {
    // retrieve time that is 5 minutes ago
    const token_expirey = Date.now() - 300000;
    // update imported mock
    mockStorage.getItem.mockImplementationOnce(async key => {
      return Promise.resolve(
        JSON.stringify({
          token: 'one_time_mock_token',
          refresh_token: 'one_time_ref_token',
          token_creation: token_expirey,
        }),
      );
    });
    try {
      // create new NetworkRequest object
      const newReq = await SecureAPIReq.createInstance();
      const result = (newReq as any).checkToken(token_exp);
      expect(result).toBe(false);
    } catch (e) {
      console.log('Error ocurred: ', e);
      throw new Error(
        `An excpetion occured in the try block: ${(e as Error).message}`,
      );
    }
  });
  it('check if checkToken() returns true if refresh token has not expired', async () => {
    try {
      // create new NetworkRequest object
      const newReq = await SecureAPIReq.createInstance();
      // Kind of a hack to call private functions this way...
      const result = (newReq as any).checkToken(refresh_exp);
      // expect the result to be true
      expect(result).toBe(true);
    } catch (e) {
      console.log('Error occured: ', e);
      throw new Error(
        `An excpetion occured in the try block: ${(e as Error).message}`,
      );
    }
  });
  it('check if checkToken() returns true if refresh token not expired', async () => {
    // retrieve 24 hours ago
    const token_expirey = Date.now() - 86400000;
    // remock current mock
    mockStorage.getItem.mockImplementationOnce(async key => {
      return Promise.resolve(
        JSON.stringify({
          token: 'one_time_mock_token',
          refresh_token: 'one_time_ref_token',
          token_creation: token_expirey,
        }),
      );
    });
    try {
      // create new NetworkRequest object
      const newReq = await SecureAPIReq.createInstance();
      const result = (newReq as any).checkToken(refresh_exp);
      expect(result).toBe(false);
    } catch (e) {
      console.log('Error occured: ', e);
      throw new Error(
        `An excpetion occured in the try block: ${(e as Error).message}`,
      );
    }
  });
  it('check if handleExpirey() returns an authentication token if it has not expired', async () => {
    try {
      const newReq = await SecureAPIReq.createInstance();
      const result = await (newReq as any).handleExpirey();
      expect(result).toBe('mock_token');
    } catch (e) {
      console.log('Error occured: ', e);
      throw new Error(
        `An excpetion occured in the try block: ${(e as Error).message}`,
      );
    }
  });
  it('check if handleExpirey() returns an authentication token if it has expired by calling createNewToken()', async () => {
    try {
      const newReq = await SecureAPIReq.createInstance();
      const result = await (newReq as any).handleExpirey();
      expect(typeof result).toBe('string');
    } catch (e) {
      console.log('Error occured: ', e);
      throw new Error(
        `An excpetion occured in the try block: ${(e as Error).message}`,
      );
    }
  });
  it('check if handleExpirey() raises an excpetion if both auth token and refresh token is expired', async () => {
    // retrieve 24 hours ago
    const token_expirey = Date.now() - 86400000;
    // remock current mock
    mockStorage.getItem.mockImplementationOnce(async key => {
      return Promise.resolve(
        JSON.stringify({
          token: 'one_time_mock_token',
          refresh_token: 'one_time_ref_token',
          token_creation: token_expirey,
        }),
      );
    });
    try {
      const newReq = await SecureAPIReq.createInstance();
      const result = await (newReq as any).handleExpirey();
      // Fail test if above expression doesn't throw anything.
      expect(true).toBe(false);
    } catch (e) {
      expect((e as Error).message).toBe(
        'Authentication failed. Must log back in again',
      );
    }
  });
  it('Check if createNewToken() returns a new authentication token', async () => {
    mockAdapter
      .onPost('users/tokens/refresh/')
      .reply(200, { access: 'mock_token' });

    try {
      const newReq = await SecureAPIReq.createInstance('');
      const result = await (newReq as any).getNewToken();
      expect(result).toBe('mock_token');
    } catch (e) {
      console.log('Error occured: ', e);
      throw new Error(
        `An excpetion occured in the try block: ${(e as Error).message}`,
      );
    }
  });
  it("Check if createNewToken() throws an error if can't communicate with server.", async () => {
    mockAdapter
      .onPost('users/tokens/refresh/')
      .reply(400, { access: 'mock_token' });
    try {
      // this is kind of a hack, but the reason I am setting an empty string. It is difficult setting the baseURL since it changes between andriod loopback and localhost.
      const newReq = await SecureAPIReq.createInstance('');
      const result = await (newReq as any).getNewToken();
      // Fail test if above expression doesn't throw anything.
      expect(true).toBe(false);
    } catch (e) {
      expect((e as Error).message).toBe(
        'Problem retrieving access token: Request failed with status code 400',
      );
    }
  });
  it('Check if a valid header is returned from local storage if it has not expired', async () => {
    try {
      const newReq = await SecureAPIReq.createInstance('');
      const result = await (newReq as any).createSecureHeader();
      // test if token is retrieved from mock storage
      expect(mockStorage.getItem).toHaveBeenCalledTimes(1);
      // since no onPost function is defined and an error is not thrown, we know that it did not try calling the backend for a new token
      expect(result).toEqual({ Authorization: 'Bearer mock_token' });
    } catch (e) {
      throw new Error(
        `An excpetion occured in the try block: ${(e as Error).message}`,
      );
    }
  });
  it('Check if a valid header is returned and refreshToken() is called when the stored token is expired', async () => {
    mockAdapter
      .onPost('users/tokens/refresh/')
      .reply(200, { access: 'incoming_mock_token' });
    // retrieve time that is 5 minutes ago
    const token_expirey = Date.now() - 300000;
    // update imported mock
    mockStorage.getItem.mockImplementationOnce(async key => {
      return Promise.resolve(
        JSON.stringify({
          token: 'one_time_mock_token',
          refresh_token: 'one_time_ref_token',
          token_creation: token_expirey,
        }),
      );
    });
    try {
      const newReq = await SecureAPIReq.createInstance('');
      const result = await (newReq as any).createSecureHeader();
      // test if token is retrieved from mock storage
      expect(mockStorage.getItem).toHaveBeenCalledTimes(1);
      // test if the token is incoming from the api
      expect(result).toEqual({ Authorization: 'Bearer incoming_mock_token' });
    } catch (e) {
      throw new Error(
        `An excpetion occured in the try block: ${(e as Error).message}`,
      );
    }
  });
  it('Check if an error is thrown if the refreshToken() is called but it recieves a server error', async () => {
    mockAdapter.onPost('users/tokens/refresh/').reply(500, {});
    // retrieve time that is 5 minutes ago
    const token_expirey = Date.now() - 300000;
    // update imported mock
    mockStorage.getItem.mockImplementationOnce(async key => {
      return Promise.resolve(
        JSON.stringify({
          token: 'one_time_mock_token',
          refresh_token: 'one_time_ref_token',
          token_creation: token_expirey,
        }),
      );
    });
    try {
      const newReq = await SecureAPIReq.createInstance('');
      const result = await (newReq as any).createSecureHeader();
      // test if token is retrieved from mock storage
      expect(mockStorage.getItem).toHaveBeenCalledTimes(1);
      expect(false).toBe(true);
    } catch (e) {
      expect((e as Error).message).toBe(
        'Error in createSecureHeader: Problem retrieving access token: Request failed with status code 500',
      );
    }
  });
  it('Check if an error is thrown if the refreshToken() is called but createSecureHeader recieves an empty response', async () => {
    mockAdapter.onPost('users/tokens/refresh/').reply(200, { access: '' });
    // retrieve time that is 5 minutes ago
    const token_expirey = Date.now() - 300000;
    // update imported mock
    mockStorage.getItem.mockImplementationOnce(async key => {
      return Promise.resolve(
        JSON.stringify({
          token: 'one_time_mock_token',
          refresh_token: 'one_time_ref_token',
          token_creation: token_expirey,
        }),
      );
    });
    try {
      const newReq: SecureAPIReq = await SecureAPIReq.createInstance('');
      const result = await (newReq as any).createSecureHeader();
      // test if token is retrieved from mock storage
      expect(mockStorage.getItem).toHaveBeenCalledTimes(1);
      // test if the token is incoming from the api
      expect(false).toBe(true);
    } catch (e) {
      expect((e as Error).message).toBe(
        'Error in createSecureHeader: Problem retrieving access token: Error in retrieving authentication token: blank response',
      );
    }
  });
  it('Check if an error is thrown in createSecureHeader if the refresh token is expired', async () => {
    // retrieve 24 hours ago
    const token_expirey = Date.now() - 86400000;
    // remock current mock
    mockStorage.getItem.mockImplementationOnce(async key => {
      return Promise.resolve(
        JSON.stringify({
          token: 'one_time_mock_token',
          refresh_token: 'one_time_ref_token',
          token_creation: token_expirey,
        }),
      );
    });
    try {
      const newReq = await SecureAPIReq.createInstance('');
      const result = await (newReq as any).createSecureHeader();
      // test if token is retrieved from mock storage
      expect(mockStorage.getItem).toHaveBeenCalledTimes(1);
      expect(false).toBe(true);
    } catch (e) {
      expect((e as Error).message).toBe(
        'Error in createSecureHeader: Authentication failed. Must log back in again',
      );
    }
  });
});
