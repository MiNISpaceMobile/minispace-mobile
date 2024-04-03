import { View } from "react-native";

import Header from "./Header/Header";
import PostList from "./PostList/PostList";

interface PostListStackProps {
  route: any;
  navigation: any;
}

const PostListStack = ({ route, navigation }: PostListStackProps) => {
  return (
    <View>
      <Header route={route} navigation={navigation} />
      <PostList route={route} navigation={navigation} />
    </View>
  );
};

export default PostListStack;
