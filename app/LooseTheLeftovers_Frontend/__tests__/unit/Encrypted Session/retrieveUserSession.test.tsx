import { retrieveUserSession } from '../../../src/common/EncryptedSession'; 
import mockStorage from '../../../__mocks__/react-native-encrypted-storage';


describe('retrieveUserSession', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Clear previous mocks
    });

    it('should successfully retrieve the user session', async () => {
        // Setting up a mock session to be returned
        const mockSession = {
            token: 'mock_token',
            refresh_token: 'ref_token',
            user_id: 'user_id',
            token_creation: Date.now() - 100000,
        };
        mockStorage.getItem.mockResolvedValue(JSON.stringify(mockSession));

        const session = await retrieveUserSession();

        expect(mockStorage.getItem).toHaveBeenCalledWith("user_session");
        expect(session).toEqual(mockSession);
    });

    it('should return null if no session is found', async () => {
        mockStorage.getItem.mockResolvedValue(null);

        const session = await retrieveUserSession();

        expect(mockStorage.getItem).toHaveBeenCalledWith("user_session");
        expect(session).toBeNull();
    });

    it('should throw an error when retrieving the user session fails', async () => {
        // Simulate an error in the getItem function
        mockStorage.getItem.mockRejectedValue(new Error('Storage Error'));

        await expect(retrieveUserSession()).rejects.toThrow('Failed to retrieve JWT: Storage Error');
    });
});
