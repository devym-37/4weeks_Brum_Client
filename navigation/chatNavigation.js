import { createAppContainer } from "react-navigation";

// Import the screens
import Main from "../screens/chat/Main";
import Chat from "../screens/chat/Chat";
import ChatRooms from "../screens/chat/ChatRooms";
// Import React Navigation
import { createStackNavigator } from "react-navigation-stack";

// Create the navigator
const ChatNavigation = createStackNavigator({
  Main,
  Chat,
  ChatRooms
});

// Export it as the root component
export default createAppContainer(ChatNavigation);
