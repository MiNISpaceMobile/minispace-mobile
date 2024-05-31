import { View } from "react-native";
import { FAB } from "react-native-paper";

import PostList from "./PostList/PostList";
import Header from "../../../components/Header/Header";
import { useOrganizedEventsStore } from "../../../zustand/organized-events";
import { useUserStore } from "../../../zustand/user";

interface PostListStackProps {
  route: any;
  navigation: any;
}

const PostListStack = ({ route, navigation }: PostListStackProps) => {
  const user = useUserStore((state) => state.user);

  return (
    <View>
      <Header title="Posty" />
      <PostList route={route} navigation={navigation} />
      {user?.isOrganizer && (
        <View
          style={{
            position: "absolute",
            minHeight: "100%",
            top: 680,
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
      )}
    </View>
  );
};

export default PostListStack;
