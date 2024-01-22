import { removeUserSession } from '../../../src/common/EncryptedSession'; 
import mockStorage from '../../../__mocks__/react-native-encrypted-storage';

describe('removeUserSession', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Clear previous mocks
    });

    it('should successfully remove the user session', async () => {
        await removeUserSession();

        expect(mockStorage.removeItem).toHaveBeenCalledWith("user_session");
    });

    it('should throw an error when removing the user session fails', async () => {
        // Simulate an error in the removeItem function
        mockStorage.removeItem.mockRejectedValue(new Error('Storage Error'));

        await expect(removeUserSession()).rejects.toThrow('Failed to remove JWT: Storage Error');
    });
});
