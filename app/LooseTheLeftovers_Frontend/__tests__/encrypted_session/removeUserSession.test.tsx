import EncryptedStorage from 'react-native-encrypted-storage';
import { removeUserSession } from '../../src/common/EncryptedSession'; 

describe('removeUserSession', () => {
    beforeEach(() => {
        jest.restoreAllMocks(); // Reset all mocks before each test
    });

    it('completes successfully when user session is removed', async () => {
        // Mock EncryptedStorage.removeItem for successful removal
        jest.spyOn(EncryptedStorage, 'removeItem').mockResolvedValueOnce(undefined);

        await expect(removeUserSession()).resolves.toBeUndefined();
    });

    it('throws an error when there is an error removing the user session', async () => {
        // Mock EncryptedStorage.removeItem to reject with an error
        const testError = new Error('Storage error');
        jest.spyOn(EncryptedStorage, 'removeItem').mockRejectedValueOnce(testError);

        await expect(removeUserSession()).rejects.toThrow(`Failed to store JWT: ${testError.message}`);
    });
});
