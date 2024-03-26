import { SecureAPIReq } from './NetworkRequest';
import { messages } from './API';
import axios from 'axios';

class ChatService {
  static async sendMessage(
    receiver_id: string,
    ad_id: string,
    message: string,
  ) {
    try {
      const secureApiReqInstance = await SecureAPIReq.createInstance();
      const messageData = {
        msg: message,
        receiver_id: receiver_id,
        ad_id: ad_id,
      };

      console.log('ChatService: messageData:', messageData);

      const response = await secureApiReqInstance.post(messages, messageData);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('ChatService: Failed to send message:', error);
      throw error;
    }
  }

  static async fetchChatUpdates(user_id: any, ad_id: any, page = 1) {
    try {
      const secureApiReqInstance = await SecureAPIReq.createInstance();
      const endpoint = `/messages/${user_id}?ad_id=${ad_id}&page=${page}`;
      const response = await secureApiReqInstance.get(endpoint);

      // console.log(response.data);
      // console.log(`ChatService: fetch for user_id: ${user_id}, ad_id: ${ad_id}, page: ${page}`);

      return response;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error response:', error.response);
      } else {
        console.error('An unexpected error occurred:', error);
      }
      throw error;
    }
  }

  static async checkHistory(user_id: string, ad_id: string) {
    try {
      const secureApiReqInstance = await SecureAPIReq.createInstance();
      const endpoint = `/messages/${user_id}?ad_id=${ad_id}`;
      const response = await secureApiReqInstance.get(endpoint);

      const hasHistory = response.data.length > 0;
      console.log(`ChatService: Chat history`, response.data);
      return hasHistory;
    } catch (error) {
      console.error('ChatService: Failed to check chat history:', error);
      throw error;
    }
  }

  static async getLastMessage() {
    try {
      const secureApiReqInstance = await SecureAPIReq.createInstance();
      const response = await secureApiReqInstance.get(messages);

      // console.log('ChatService: getLastMessage response:', response.data);

      return response.data;
    } catch (error) {
      console.error('ChatService: Failed to get last messages:', error);
      throw error;
    }
  }

  static async getUserById(user_id: string) {
    try {
      const secureApiReqInstance = await SecureAPIReq.createInstance();
      const response = await secureApiReqInstance.get(`/users/${user_id}`);
      console.log("getUserById response:", response.data);
      return response.data;
    } catch (error) {
      console.error("ChatService: Failed to get user details:", error);
      throw error;
    }
  }

  static async getAdTitle(ad_id: number) {
    try {
      const secureApiReqInstance = await SecureAPIReq.createInstance();
      const response = await secureApiReqInstance.get(`/ads/${ad_id}`);
      // console.log("getAdTitle response:", response.data);
      return response.data.title;
    } catch (error) {
      console.error("ChatService: Failed to get ad title:", error);
      throw error;
    }
  }
}

export default ChatService;
