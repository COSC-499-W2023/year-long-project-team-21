# Messages

The messages service operates with polling, hence fetching data from the server on a certain interval, which provides a near-real-time experience.

## ChatContext

**Purpose**: Manages the global state related to chat, wraps `<AppNavigator />`, manages varying intervals (depends on `ChatList` being in or out of focus), handles in-app notifications (highlighting unread chats and showing dot on `MessageIcon`). Starts fetching data as soon as the user logs in, and stops when the user logs out.

**Data Managed**:

- `your_id`: The current user's ID.
- `chats`: An array of the last message from each chat.
- `loggedIn`: Indicates whether the user is logged in.
- `hasUnread`: Flag if there are any unread chats, used for `MessageIcon`.
- `updateLoggedIn`, `updateFocus`, `markChatAsReadById`: Functions to update login status, `ChatList` focus, and remove unread flag from specific chat.

## ChatService

**Purpose**: Handles all network requests related to the chats, including sending messages, fetching chat updates, checking for existing chat history, and retrieving the last message of each chat. Is built upon `NetworkRequest`. 

**Key Methods**:

- `sendMessage(user_id, ad_id, message)`: Sends a message to a specific user about an ad.
- `fetchChatUpdates(user_id, ad_id, page)`: Fetches all messages for a chat with pagination.
- `checkHistory(user_id, ad_id)`: Checks if there's an existing conversation.
- `getLastMessage()`: Retrieves the last message from each chat conversation the user is part of.

## ChatList

**Purpose**: Displays a list of all chat conversations a user is part of, showing a preview of the last message, the time it was sent, and whether it's read or unread. Runs a fetch immediately when comes in focus, otherwise `ChatContext` fetches on a specific interval.

**Data Needed**:

Consumes chat data from `ChatContext`.

### ChatListItem

**Purpose**: Represents an individual chat item, displaying the other user's name, the last message, and the time it was sent. Indicates unread messages visually. Rendered in a FlatList inside `ChatList`.

**Data Needed**:

Individual chat information passed from ChatList:

- `user_id`: Other user's ID.
- `ad_id`: The related ad ID.
- `title`: The related ad title.
- `your_id`: The current user's ID.
- `new_chat`: New / existing chat flag, **always** false, since only existing chats are rendered in `ChatList`.

## Chat

**Purpose**: The individual chat screen where users can view the entire message history of a conversation and send new messages. Loads the entire message history on the mount, after that fetches page 1 every 5 seconds (page 1 has the most recent messages).

**Data Needed**:

- `user_id`: Other user's ID.
- `ad_id`: The related ad ID.
- `title`: The related ad title.
- `your_id`: The current user's ID.
- `new_chat`: New / existing chat flag, always false if navigated from `ChatList`, can be true if navigated from `View_Post` and the chat doesn't exist.
