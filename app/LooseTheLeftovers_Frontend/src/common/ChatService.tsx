import { SecureAPIReq } from './NetworkRequest';
import { messages } from './API';
import axios, { AxiosError } from 'axios';

class ChatService {
    static async fetchLastMessage() {
        try {
            const secureApiReqInstance = await SecureAPIReq.createInstance();
            const response = await secureApiReqInstance.get(messages);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error("Failed to fetch chats:", error);
            throw error;
        }
    }

    static async sendMessage(receiverId: string, adId: string, messageContent: string) {
        try {
          const secureApiReqInstance = await SecureAPIReq.createInstance();
          const messageData = {
            msg: messageContent,
            receiver_id: receiverId,
            ad_id: adId,
          };
          const response = await secureApiReqInstance.post(messages, messageData);
          console.log(response.data);
          return response.data; // or you can return a specific part of response.data if needed
        } catch (error) {
          console.error("Failed to send message:", error);
          throw error;
        }
    }

    static async fetchChatUpdates(userId: any, adId: any, page = 1) {
        try {
            const secureApiReqInstance = await SecureAPIReq.createInstance();
            const endpoint = `/messages/${userId}?ad_id=${adId}&page=${page}`;
            const response = await secureApiReqInstance.get(endpoint);
            console.log(response.data);
            return response.data;
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
              console.error("Axios error response:", error.response);
            } else {
              console.error("An unexpected error occurred:", error);
            }
            throw error;
        }
    }
};

export default ChatService;
