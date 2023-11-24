import EncryptedStorage from 'react-native-encrypted-storage';

// storing session  
export async function storeUserSession(token: string, refresh_token: string) {
    const timestamp = Date.now(); // Get current timestamp
    try {
        await EncryptedStorage.setItem(
            "user_session",
            JSON.stringify({
                token : token,
                refresh_token : refresh_token,
                token_creation :timestamp
            })
        );
    } catch (error) {
        throw new Error(`Failed to store JWT: ${error instanceof Error ? error.message : String(error)}`);
    }
}

// retrieve session 
async function retrieveUserSession() {
    try {   
        const session = await EncryptedStorage.getItem("user_session");
    
        if (session !== undefined) {
            return session
        }
    } catch (error) {
        // There was an error on the native side
    }
}

// returns true if user_session is removed, false otherwise. 
export async function removeUserSession() {
    try {
        await EncryptedStorage.removeItem("user_session");
    } catch (error) {
        throw new Error(`Failed to store JWT: ${error instanceof Error ? error.message : String(error)}`);
    }
}

// clear the storage 
export async function clearStorage() {
    try {
        await EncryptedStorage.clear();
        return true; 
    } catch (error) {
        return false;
    }
}
