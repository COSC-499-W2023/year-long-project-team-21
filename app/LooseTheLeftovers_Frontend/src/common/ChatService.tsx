import { SecureAPIReq } from './NetworkRequest';
import { messages, users, adEndpoint } from './API';

class ChatService {
  /**
   * Sends a single message, makes POST request to /messages/.
   *
   * @param {number} user_id - The ID of the user who will receive the message.
   * @param {number} ad_id - The ID of the advertisement the message is related to.
   * @param {string} message - The content of the message.
   * @returns {Promise<Object>} - A promise that resolves to the response data from the server.
   */
  static async sendMessage(user_id: number, ad_id: number, message: string) {
    try {
      const secureApiReqInstance: any = await SecureAPIReq.createInstance();
      const messageData = {
        msg: message,
        receiver_id: user_id,
        ad_id: ad_id,
      };
      const response = await secureApiReqInstance.post(messages, messageData);
      return response.data;
    } catch (error) {
      console.error('ChatService: Failed to send message:', error);
      throw error;
    }
  }

  /**
   * Fetches messages by page, defaults to page 1. Page 1 is the most recent messages.
   * Sends a GET request to /messages/<user_id>?ad_id=<ad_id>&page=<page>.
   *
   * @param {number} user_id - The ID of the user.
   * @param {number} ad_id - The ID of the related ad.
   * @param {number} [page=1] - The page number of the chat history to fetch.
   * @returns {Promise<Object>} An array of messages, one page = six messages.
   */
  static async fetchChatUpdates(user_id: number, ad_id: number, page = 1) {
    try {
      const secureApiReqInstance: any = await SecureAPIReq.createInstance();
      const endpoint = `${messages}${user_id}?ad_id=${ad_id}&page=${page}`;
      const response = await secureApiReqInstance.get(endpoint);
      return response;
    } catch (error) {
      console.error('ChatService: Failed to check chat history:', error);
      throw error;
    }
  }

  /**
   * Checks whether the current user has an existing chat with particular user
   * regarding particular ad. Sends GET request to /messages/<user_id>?ad_id=<ad_id>
   * via fetchChatUpdates, checks page 1.
   *
   * @param {string} user_id - The ID of the other user.
   * @param {number} ad_id - The ID of the related ad.
   * @returns {boolean} - A `true` if response is not empty, `false` otherwise.
   */
  static async checkHistory(user_id: string, ad_id: number): Promise<boolean> {
    try {
      // Use fetchChatUpdates
      const response = await this.fetchChatUpdates(parseInt(user_id, 10), ad_id, 1);
  
      // If response length > 0 => history exists, return true
      const hasHistory = response.data && response.data.length > 0;
      return hasHistory;
    } catch (error) {
      console.error('ChatService: Failed to check chat history:', error);
      throw error;
    }
  }

  /**
   * Fetches last message from each conversation user currently has, sends GET request to /messages/.
   *
   * @returns {Promise<Array>} - An array containing the last message from each of the user's chat conversations.
   */
  static async getLastMessage() {
    try {
      const secureApiReqInstance: any = await SecureAPIReq.createInstance();
      const response = await secureApiReqInstance.get(messages);
      return response.data;
    } catch (error) {
      console.error('ChatService: Failed to get last messages:', error);
      throw error;
    }
  }

  /**
   * Fetches a particular user info by ID. Sends GET request to /users/<user_id>.
   *
   * @param {number} user_id - The ID of the other user.
   * @returns {Promise<Array>} - An array with info about user.
   */
  static async getUserById(user_id: number) {
    try {
      const secureApiReqInstance: any = await SecureAPIReq.createInstance();
      const response = await secureApiReqInstance.get(`${users}${user_id}`);
      return response.data;
    } catch (error) {
      console.error('ChatService: Failed to get user details:', error);
      throw error;
    }
  }

  /**
   * Fetches ad title by ID. Sends GET request to /ads/<ad_id>.
   *
   * @param {number} ad_id - The ID of an ad.
   * @returns {string} - Title of the ad.
   */
  static async getAdTitle(ad_id: number) {
    try {
      const secureApiReqInstance: any = await SecureAPIReq.createInstance();
      const response = await secureApiReqInstance.get(`${adEndpoint}${ad_id}`);
      return response.data.title;
    } catch (error) {
      console.error('ChatService: Failed to get ad title:', error);
      throw error;
    }
  }
}

export default ChatService;
