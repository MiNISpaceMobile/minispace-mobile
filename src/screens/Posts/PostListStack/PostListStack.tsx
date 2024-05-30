import { View } from "react-native";
import { FAB } from "react-native-paper";

import PostList from "./PostList/PostList";
import Header from "../../../components/Header/Header";
import { usePostsStore } from "../../../zustand/posts";

interface PostListStackProps {
  route: any;
  navigation: any;
}

const PostListStack = ({ route, navigation }: PostListStackProps) => {
  const loading = usePostsStore((state) => state.loading);

  return (
    <View>
      <Header title="Posty" />
      <PostList route={route} navigation={navigation} />
      <View
        style={{
          position: "absolute",
          bottom: loading ? -570 : 140,
          minWidth: "100%",
          alignItems: "center",
        }}
      >
        <FAB
          icon="plus"
          label="Nowy post"
          onPress={() => navigation.navigate("CreatePost")}
        />
      </View>
    </View>
  );
};

export default PostListStack;
