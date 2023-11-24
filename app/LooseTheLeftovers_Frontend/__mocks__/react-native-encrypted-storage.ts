// __mocks__/react-native-encrypted-storage.js
const mockEncryptedStorage = {
    setItem: jest.fn().mockResolvedValue(undefined),
    getItem: jest.fn().mockResolvedValue('mocked_value'), // Adjust as needed
    removeItem: jest.fn().mockResolvedValue(undefined)
};

export default mockEncryptedStorage;
