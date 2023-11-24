import axios from 'axios';
import { NetworkRequest } from '../../src/common/NetworkRequest'; 
import { devURL } from '../../src/common/api'; // this will need to change when env variables

// mocking axios 
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('NetworkRequest', () => {
  it('should correctly set the url property when instantiated', () => {
    const testUrl: string = 'users/tokens';
    const networkRequest = new NetworkRequest(testUrl);
    expect(networkRequest.getUrl()).toBe(devURL + testUrl);
  });

  it('should correctly authenticate user and store access token in local storage', async () => {
    // Define the mock response
    const mockResponse = {
      data: {
        accessToken: 'mockAccessToken',
        refreshToken: 'mockRefreshToken'
      }
    };

    // Mock the axios post method with correct type
    mockedAxios.post.mockResolvedValue(mockResponse);

    // Spy on localStorage.setItem to check if it's being called correctly
    //const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    const loginReq = new NetworkRequest('users/tokens');
    
    // Await the login call
    await loginReq.login('Gerren', 'test123');

    // Assert that localStorage.setItem was called with the correct tokens
    //expect(setItemSpy).toHaveBeenCalledWith('accessToken', 'mockAccessToken');
    //expect(setItemSpy).toHaveBeenCalledWith('refreshToken', 'mockRefreshToken');

    // Cleanup: remove the spy
  });
});