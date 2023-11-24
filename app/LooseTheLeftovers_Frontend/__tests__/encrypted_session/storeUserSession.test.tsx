import EncryptedStorage from 'react-native-encrypted-storage';
import { storeUserSession } from '../../src/common/EncryptedSession'; 

// mock EncryptedStorage
jest.mock('react-native-encrypted-storage', () => ({
    setItem: jest.fn()
}));

beforeEach(() => {
    jest.restoreAllMocks(); 
});

describe('storeUserSession', () => {
    const mockToken = 'mockToken';
    const mockRefreshToken = 'mockRefreshToken';

    it('successfully stores user session data', async () => {
        const setItemSpy = jest.spyOn(EncryptedStorage, 'setItem');
        
        await storeUserSession(mockToken, mockRefreshToken);
    
        // First, get the actual call arguments
        const callArgs = setItemSpy.mock.calls[0];
    
        // Parse the JSON string to an object to check its structure
        const storedSession = JSON.parse(callArgs[1]);
    
        // Check if all properties are as expected
        expect(storedSession.token).toBe(mockToken);
        expect(storedSession.refresh_token).toBe(mockRefreshToken);
        expect(storedSession.token_creation).toEqual(expect.any(Number));
    
        // Alternatively, you can check the entire object structure
        expect(callArgs).toEqual([
            "user_session",
            expect.stringMatching(new RegExp(`{"token":"${mockToken}","refresh_token":"${mockRefreshToken}","token_creation":\\d+}`))
        ]);
    });
    

    it('throws an error when storing user session data fails', async () => {
        // Simulate an error
        jest.spyOn(EncryptedStorage, 'setItem').mockRejectedValue(new Error('Storage error'));

        await expect(storeUserSession(mockToken, mockRefreshToken))
            .rejects
            .toThrow('Failed to store JWT: Storage error');
    });
});
