import { createAppContainer } from "react-navigation";

// Import the screens
import Main from "../screens/chat/Main";
import Chat from "../screens/chat/Chat";
import ChatRooms from "../screens/chat/ChatRooms";
import ChatListScreen from "../screens/Tabs/Chats/ChatListScreen";
// Import React Navigation
import { createStackNavigator } from "react-navigation-stack";

// Create the navigator
const ChatNavigation = createStackNavigator({
  ChatListScreen,
  ChatRooms,
  Chat
});

// Export it as the root component
export default createAppContainer(ChatNavigation);
