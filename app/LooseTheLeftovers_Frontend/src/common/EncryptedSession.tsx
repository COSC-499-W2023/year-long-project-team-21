import EncryptedStorage from 'react-native-encrypted-storage';

// Returns true if the program has launched once before. Returns false if it hasn't, then updates async encrpyted storage.
export async function checkHasLaunched(){
  /*
  const hasLaunched:any = await getHasLaunched();
  if(hasLaunched === "true"){
    return true; 
  }
  await setHasLaunched();*/
  return false;
}

// function that retrieves getFirstOpen
export async function getHasLaunched(){
  try{
    const firstOpen:any = await EncryptedStorage.getItem('hasLaunched');
    return firstOpen; 
  }
  catch(error){
    throw error;
  }
}

// function that sets setFirstOpen to true 
export async function setHasLaunched(){
  try{
    await EncryptedStorage.setItem("hasLaunched", "true");
  }
  catch(error){
    throw error;
  }
}

/**
 * Stores user session data securely.
 * @param {string} token - The user's token.
 * @param {string} refresh_token - The user's refresh token.
 * @param {string} userId - The user's id
 * @throws {Error} - Throws an error if storing JWT fails.
 */
export async function storeUserSession(
  token: string,
  refresh_token: string,
  userId: string,
) {
  const timestamp = Date.now(); // Get current timestamp
  try {
    await EncryptedStorage.setItem(
      'user_session',
      JSON.stringify({
        token,
        refresh_token,
        user_id: userId,
        token_creation: timestamp,
      }),
    );
  } catch (error) {
    throw new Error(
      `Failed to store JWT: ${
        error instanceof Error ? error.message : String(error)
      }`,
    );
  }
}

/**
 * Retrieves the user session from secure storage.
 * @returns {Promise<Object|null>} - JSON parsed session if a record exists, otherwise null.
 * @throws {Error} - Throws an error if retrieving the session fails.
 */
export async function retrieveUserSession() {
  try {
    const session = await EncryptedStorage.getItem('user_session');
    return session !== undefined && session !== null
      ? JSON.parse(session)
      : null;
  } catch (error) {
    throw new Error(
      `Failed to retrieve JWT: ${
        error instanceof Error ? error.message : String(error)
      }`,
    );
  }
}

/**
 * Removes the user session from secure storage.
 * @returns {Promise<boolean>} - Returns true if the user session is removed, false otherwise.
 * @throws {Error} - Throws an error if removing the session fails.
 */
export async function removeUserSession() {
  try {
    await EncryptedStorage.removeItem('user_session');
    return true;
  } catch (error) {
    throw new Error(
      `Failed to remove JWT: ${
        error instanceof Error ? error.message : String(error)
      }`,
    );
  }
}

/**
 * Clears all data from secure storage.
 * @returns {Promise<boolean>} - Returns true if storage is cleared, false otherwise.
 */
export async function clearStorage() {
  try {
    await EncryptedStorage.clear();
    return true;
  } catch (error) {
    return false;
  }
}
