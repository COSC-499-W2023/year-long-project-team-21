import { storeUserSession } from '../../../src/common/EncryptedSession'; 
import mockStorage from '../../../__mocks__/react-native-encrypted-storage';

//jest.mock('react-native-encrypted-storage', () => mockStorage);

describe('storeUserSession', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Clear previous mocks
    });

    it('should successfully store the user session', async () => {
        const token = 'testToken';
        const refreshToken = 'testRefreshToken';
        
        await storeUserSession(token, refreshToken);
    
        expect(mockStorage.setItem).toHaveBeenCalledWith(
            "user_session",
            expect.stringContaining(`"token":"${token}"`)
        );
        expect(mockStorage.setItem).toHaveBeenCalledWith(
            "user_session",
            expect.stringContaining(`"refresh_token":"${refreshToken}"`)
        );
        expect(mockStorage.setItem).toHaveBeenCalledWith(
            "user_session",
            expect.stringMatching(/"token_creation":\d+/)
        );
    });

    it('should throw an error when storing the user session fails', async () => {
        // Simulate an error in the setItem function
        mockStorage.setItem.mockRejectedValue(new Error('Storage Error'));

        const token = 'testToken';
        const refreshToken = 'testRefreshToken';

        await expect(storeUserSession(token, refreshToken)).rejects.toThrow('Failed to store JWT: Storage Error');
    });

});
