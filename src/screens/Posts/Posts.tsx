import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";

import FilterStack from "./FilterStack/FilterStack";
import PostDetailsStack from "./PostDetailsStack/PostDetailsStack";
import PostListStack from "./PostListStack/PostListStack";

const Stack = createStackNavigator();

const Posts = () => {
  return (
    <NavigationContainer>
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
          name="Filter"
          children={(props) => (
            <SafeAreaView>
              <FilterStack {...props} />
            </SafeAreaView>
          )}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Posts;
