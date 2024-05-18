import { View } from "react-native";

import PostList from "./PostList/PostList";
import Header from "../../../components/Header/Header";

interface PostListStackProps {
  route: any;
  navigation: any;
}

const PostListStack = ({ route, navigation }: PostListStackProps) => {
  return (
    <View>
      <Header title="Posty" />
      <PostList route={route} navigation={navigation} />
    </View>
  );
};

export default PostListStack;
