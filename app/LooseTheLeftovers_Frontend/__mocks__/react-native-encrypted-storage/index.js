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
//     setItem: jest.fn(() => Promise.resolve()),
//   getItem: jest.fn(() => Promise.resolve('{ "foo": 1 }')),
//   removeItem: jest.fn(() => Promise.resolve()),
//   clear: jest.fn(() => Promise.resolve()),
};