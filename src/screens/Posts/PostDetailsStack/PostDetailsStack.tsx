import { useEffect } from "react";
import { ScrollView } from "react-native";

import Header from "./Header/Header";
import PostComments from "./PostComments/PostComments";
import PostSpecifics from "./PostSpecifics/PostSpecifics";
import Post from "../../../interfaces/Post";
import { useNavigationStore } from "../../../zustand/navigation";
import { usePostDetailsStore } from "../../../zustand/post-details";

interface PostDetailsStackProps {
  route: any;
  navigation: any;
}

const PostDetailsStack = ({ route, navigation }: PostDetailsStackProps) => {
  const { post } = route.params as { post: Post };

  const postDetails = usePostDetailsStore((state) => state.postDetails);
  const error = usePostDetailsStore((state) => state.error);
  const loading = usePostDetailsStore((state) => state.loading);
  const fetchPostDetails = usePostDetailsStore(
    (state) => state.fetchPostDetails,
  );

  useEffect(() => {
    fetchPostDetails(post.id);
  }, []);

  const setDisplay = useNavigationStore((state) => state.setDisplay);

  useEffect(() => {
    setDisplay("none");

    // https://stackoverflow.com/a/64789273
    const unsubscribe = navigation.addListener("beforeRemove", (e: any) => {
      e.preventDefault();
      unsubscribe();
      setDisplay("flex");
      navigation.navigate("PostList");
    });
  }, [navigation]);

  return (
    <ScrollView>
      <Header route={route} navigation={navigation} postDetails={postDetails} />
      <PostSpecifics
        postDetails={postDetails}
        loading={loading}
        error={error}
        route={route}
        navigation={navigation}
      />
      <PostComments route={route} navigation={navigation} />
    </ScrollView>
  );
};

export default PostDetailsStack;
