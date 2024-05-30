import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";

import CreatePostStack from "./CreatePostStack/CreatePostStack";
import PostDetailsStack from "./PostDetailsStack/PostDetailsStack";
import PostListStack from "./PostListStack/PostListStack";
import EventDetailsStack from "../Events/EventDetailsStack/EventDetailsStack";

const Stack = createStackNavigator();

const Posts = () => {
  return (
    <Stack.Navigator
      initialRouteName="PostList"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="PostList"
        children={(props) => (
          <SafeAreaView testID="post-list">
            <PostListStack {...props} />
          </SafeAreaView>
        )}
      />
      <Stack.Screen
        name="PostDetails"
        children={(props) => (
          <SafeAreaView>
            <PostDetailsStack {...props} />
          </SafeAreaView>
        )}
      />
      <Stack.Screen
        name="PostEventDetails"
        children={(props) => (
          <SafeAreaView>
            <EventDetailsStack {...props} />
          </SafeAreaView>
        )}
      />
      <Stack.Screen
        name="CreatePost"
        children={(props) => (
          <SafeAreaView>
            <CreatePostStack {...props} />
          </SafeAreaView>
        )}
      />
    </Stack.Navigator>
  );
};

export default Posts;
