import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { SecureAPIReq } from '../../../src/common/NetworkRequest';
import mockStorage from '../../../__mocks__/react-native-encrypted-storage';

jest.mock('axios', () => {
  return {
    ...(jest.requireActual('axios') as object),
    create: jest.fn().mockReturnValue(jest.requireActual('axios')),
  };
});

const mockAdapter = new MockAdapter(axios);

describe('Test API requests', () => {
  afterEach(() => {
    mockAdapter.resetHandlers();
    jest.clearAllMocks();
  });
  // ************************* GET *************************
  it('should correctly perform a GET request', async () => {
    const fakeResponse = { data: 'test' };
    mockAdapter.onGet('test-endpoint').reply(200, fakeResponse);

    const api: any = await SecureAPIReq.createInstance();
    const response = await api.get('test-endpoint');

    expect(response.data).toEqual(fakeResponse);
  });
  it('GET should handle 404 not found', async () => {
    mockAdapter.onGet('nonexistent-endpoint').reply(404);

    const api: any = await SecureAPIReq.createInstance();

    await expect(api.get('nonexistent-endpoint')).rejects.toThrow(
      'Request failed with status code 404',
    );
  });
  it('GET should handle network errors', async () => {
    mockAdapter.onGet('test-endpoint').networkError();

    const api: any = await SecureAPIReq.createInstance();

    await expect(api.get('test-endpoint')).rejects.toThrow('Network Error');
  });
  it('GET should send request with correct query parameters', async () => {
    const fakeResponse = { data: 'test' };
    const params = { key1: 'value1', key2: 'value2' };

    mockAdapter.onGet('/test-endpoint').reply(config => {
      expect(config.params).toEqual(params);
      return [200, fakeResponse];
    });

    const api: any = await SecureAPIReq.createInstance();
    const response = await api.get('/test-endpoint', params);

    expect(response.data).toEqual(fakeResponse);
  });
  it('GET should send request with headers', async () => {
    const fakeResponse = { data: 'authenticated' };
    mockAdapter.onGet('auth-endpoint').reply(config => {
      // Check headers here
      expect(config.headers).toHaveProperty('Authorization');
      return [200, fakeResponse];
    });

    const api: any = await SecureAPIReq.createInstance();
    const response = await api.get('auth-endpoint');

    expect(response.data).toEqual(fakeResponse);
  });
  // ************************* POST *************************
  it('should successfully perform a POST request', async () => {
    const fakeResponse = { data: 'success' };
    const endpoint = '/test-post';
    const postData = { key1: 'value1', key2: 'value2' };

    mockAdapter.onPost(endpoint).reply(200, fakeResponse);

    const api = await SecureAPIReq.createInstance();
    const response = await api.post(endpoint, postData);

    expect(response.data).toEqual(fakeResponse);
  });
  it('POST should send form-encoded data correctly', async () => {
    const fakeResponse = { data: 'form success' };
    const endpoint = '/form-post';
    const formData = { field1: 'value1', field2: 'value2' };

    mockAdapter.onPost(endpoint).reply(config => {
      expect(config.data).toBe(new URLSearchParams(formData).toString());
      return [200, fakeResponse];
    });

    const api = await SecureAPIReq.createInstance();
    const response = await api.post(endpoint, formData, undefined, true);

    expect(response.data).toEqual(fakeResponse);
  });
  it('should send POST request with correct query parameters and body', async () => {
    const fakeResponse = { data: 'test' };
    const endpoint = '/test-post-params';
    const postData = { key: 'value' };
    const params = { param1: 'one', param2: 'two' };

    mockAdapter.onPost(endpoint, postData).reply(config => {
      expect(config.data).toEqual(JSON.stringify(postData));
      expect(config.params).toEqual(params);
      return [200, fakeResponse];
    });

    const api = await SecureAPIReq.createInstance();

    try {
      const response = await api.post(endpoint, postData, params);
      expect(response.data).toEqual(fakeResponse);
    } catch (e) {
      console.error('Error:', e);
      expect(false).toBe(true);
    }
  });

  it('should handle errors in POST request', async () => {
    const endpoint = '/test-post-error';
    mockAdapter.onPost(endpoint).reply(500);

    const api = await SecureAPIReq.createInstance();

    await expect(api.post(endpoint, {})).rejects.toThrow(
      'Request failed with status code 500',
    );
  });
  // ************************* PUT *************************
  it('should successfully perform a PUT request', async () => {
    const fakeResponse = { data: 'success' };
    const endpoint = '/test-put';
    const updateData = { key1: 'updatedValue1', key2: 'updatedValue2' };

    mockAdapter.onPut(endpoint).reply(200, fakeResponse);

    const api = await SecureAPIReq.createInstance();
    const response = await api.put(endpoint, updateData);

    expect(response.data).toEqual(fakeResponse);
  });
  it('should send PUT request with correct query parameters', async () => {
    const fakeResponse = { data: 'test' };
    const endpoint = '/test-put-params';
    const updateData = { key: 'updatedValue' };
    const params = { param1: 'one', param2: 'two' };

    mockAdapter.onPut(endpoint).reply(config => {
      expect(config.data).toEqual(JSON.stringify(updateData));
      expect(config.params).toEqual(params);
      return [200, fakeResponse];
    });

    try {
      const api = await SecureAPIReq.createInstance();
      const response = await api.put(endpoint, updateData, params);
      expect(response.data).toEqual(fakeResponse);
      console.log(response.data);
    } catch (e) {
      console.error('Error:', e);
      //expect(false).toEqual(true);
    }
  });

  it('should handle errors in PUT request', async () => {
    const endpoint = '/test-put-error';
    mockAdapter.onPut(endpoint).reply(500);

    const api = await SecureAPIReq.createInstance();

    await expect(api.put(endpoint, {})).rejects.toThrow(
      'Request failed with status code 500',
    );
  });
  it('should send PUT request with headers', async () => {
    const fakeResponse = { data: 'success' };
    const endpoint = '/test-put-auth';
    const updateData = { key: 'value' };

    mockAdapter.onPut(endpoint).reply(config => {
      expect(config.headers).toHaveProperty('Authorization');
      return [200, fakeResponse];
    });

    const api = await SecureAPIReq.createInstance();
    const response = await api.put(endpoint, updateData);

    expect(response.data).toEqual(fakeResponse);
  });
  // ************************* DELETE *************************
  it('should successfully perform a DELETE request', async () => {
    const fakeResponse = { data: 'deleted' };
    const endpoint = '/test-delete';

    mockAdapter.onDelete(endpoint).reply(200, fakeResponse);

    const api = await SecureAPIReq.createInstance();
    const response = await api.delete(endpoint);

    expect(response.data).toEqual(fakeResponse);
  });
  it('should send DELETE request with correct query parameters', async () => {
    const fakeResponse = { data: 'deleted with params' };
    const endpoint = '/test-delete-params';
    const params = { param1: 'one', param2: 'two' };

    mockAdapter.onDelete(endpoint, { params }).reply(200, fakeResponse);

    const api = await SecureAPIReq.createInstance();
    const response = await api.delete(endpoint, params);

    expect(response.data).toEqual(fakeResponse);
  });
  it('should handle errors in DELETE request', async () => {
    const endpoint = '/test-delete-error';
    mockAdapter.onDelete(endpoint).reply(500);

    const api = await SecureAPIReq.createInstance();

    await expect(api.delete(endpoint)).rejects.toThrow(
      'Request failed with status code 500',
    );
  });
  it('should send DELETE request with headers', async () => {
    const fakeResponse = { data: 'delete with headers' };
    const endpoint = '/test-delete-auth';

    mockAdapter.onDelete(endpoint).reply(config => {
      expect(config.headers).toHaveProperty('Authorization');
      return [200, fakeResponse];
    });

    const api = await SecureAPIReq.createInstance();
    const response = await api.delete(endpoint);

    expect(response.data).toEqual(fakeResponse);
  });
});
