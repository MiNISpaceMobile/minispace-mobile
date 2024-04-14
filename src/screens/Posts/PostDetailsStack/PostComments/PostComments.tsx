import { useEffect } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

import ErrorStatus from "./ErrorStatus/ErrorStatus";
import PostCommentsItem from "./PostCommentsItem/PostCommentsItem";
import Skeleton from "../../../../components/Skeleton/Skeleton";
import Post from "../../../../interfaces/Post";
import { useCommentsStore } from "../../../../zustand/comments";

interface PostCommentsProps {
  route: any;
}

const PostComments = ({ route }: PostCommentsProps) => {
  const { post } = route.params as { post: Post };

  const comments = useCommentsStore((state) => state.comments);
  const error = useCommentsStore((state) => state.error);
  const loading = useCommentsStore((state) => state.loading);
  const fetchComments = useCommentsStore((state) => state.fetchComments);

  useEffect(() => {
    fetchComments(post.id);
  }, []);

  return (
    <View style={{ padding: 10 }}>
      <Text variant="titleMedium">Komentarze:</Text>
      {error ? (
        <ErrorStatus />
      ) : (
        <Skeleton loading={loading} height={100} width="100%">
          <View>
            {comments.map((comment) => (
              <PostCommentsItem comment={comment} key={comment.id} />
            ))}
          </View>
        </Skeleton>
      )}
    </View>
  );
};

export default PostComments;
