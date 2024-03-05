import { SecureAPIReq } from './NetworkRequest';
import { lastMessage } from './API';

class ChatService {
    static async fetchLastMessage() {
        try {
            const secureApiReqInstance = await SecureAPIReq.createInstance();
            const response = await secureApiReqInstance.get(lastMessage);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error("Failed to fetch chats:", error);
            throw error;
        }
    }
}

export default ChatService;
