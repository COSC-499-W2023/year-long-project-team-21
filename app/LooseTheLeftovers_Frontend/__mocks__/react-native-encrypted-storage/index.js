export default {
    setItem: jest.fn(async (key, value) => {
        return Promise.resolve(true);
    }),
    getItem: jest.fn(async (key) => {
        return Promise.resolve('mocked_token');
    }),
    removeItem: jest.fn(async (key) => {
        return Promise.resolve(true);
    }),
};