import { useEffect } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

import PostCommentsItem from "./PostCommentsItem/PostCommentsItem";
import Post from "../../../../interfaces/Post";
import { useCommentsStore } from "../../../../zustand/comments";

interface PostCommentsProps {
  route: any;
  navigation: any;
}

const PostComments = ({ route, navigation }: PostCommentsProps) => {
  const { post } = route.params as { post: Post };

  const comments = useCommentsStore((state) => state.comments);
  const fetchComments = useCommentsStore((state) => state.fetchComments);

  useEffect(() => {
    fetchComments(post.id);
  }, []);

  return (
    <View style={{ padding: 10 }}>
      <Text variant="titleMedium">Komentarze:</Text>
      {comments.map((comment) => (
        <PostCommentsItem comment={comment} key={comment.id} />
      ))}
    </View>
  );
};

export default PostComments;
