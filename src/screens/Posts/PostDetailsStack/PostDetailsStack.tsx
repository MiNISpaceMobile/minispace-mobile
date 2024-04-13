import { useEffect } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

import Post from "../../../interfaces/Post";
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

  return loading ? (
    <View>
      <Text>Loading...</Text>
    </View>
  ) : error || postDetails === null ? (
    <View>
      <Text>Error</Text>
    </View>
  ) : (
    <View>
      <Text>{postDetails.title}</Text>
      <Text>{postDetails.content}</Text>
    </View>
  );
};

export default PostDetailsStack;
