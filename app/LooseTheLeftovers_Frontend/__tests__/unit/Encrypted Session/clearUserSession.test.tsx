import { clearStorage } from '../../../src/common/EncryptedSession'; 
import mockStorage from '../../../__mocks__/react-native-encrypted-storage';

describe('clearStorage', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Clear previous mocks
    });

    it('should successfully clear the storage', async () => {
        mockStorage.clear.mockResolvedValue(true);

        const result = await clearStorage();

        expect(mockStorage.clear).toHaveBeenCalled();
        expect(result).toBe(true);
    });

    it('should return false when clearing the storage fails', async () => {
        mockStorage.clear.mockRejectedValue(new Error('Storage Error'));

        const result = await clearStorage();

        expect(mockStorage.clear).toHaveBeenCalled();
        expect(result).toBe(false);
    });
});
