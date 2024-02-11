import { djangoConfig } from '../../../src/common/NetworkRequest'; 

describe('djangoConfig function', () => {
    it('should return the correct AxiosRequestConfig', () => {
        const expectedConfig = {
            baseURL: 'http://10.0.2.2:8000',
            timeout: 1500,
        };

        const config = djangoConfig();
        expect(config).toEqual(expectedConfig);
    });
});