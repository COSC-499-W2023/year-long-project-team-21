// retrieve a token creation time below expirey
const token_expirey = Date.now() - 250000;

export default {
    setItem: jest.fn(async (key, value) => {
        return Promise.resolve(true);
    }),
    getItem: jest.fn(async (key) => {
        return Promise.resolve(
            JSON.stringify({
                token: 'mock_token', // Replace 'mock_token' with the actual token value if it's variable
                refresh_token: 'ref_token', // Replace 'ref_token' with the actual refresh token value if it's variable
                token_creation: token_expirey // Assuming 150000 is a number, not a string
            })
        );  
    }),
    removeItem: jest.fn(async (key) => {
        return Promise.resolve(true);
    }),
    clear: jest.fn(async (key) => {
        return Promise.resolve(true);
    })
};