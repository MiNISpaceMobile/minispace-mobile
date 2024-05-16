import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";

import PostDetailsStack from "./PostDetailsStack/PostDetailsStack";
import PostListStack from "./PostListStack/PostListStack";

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
    </Stack.Navigator>
  );
};

export default Posts;
