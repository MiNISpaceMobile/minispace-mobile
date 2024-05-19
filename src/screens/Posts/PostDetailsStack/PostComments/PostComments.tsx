import { useEffect } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

import ErrorStatus from "./ErrorStatus/ErrorStatus";
import PostCommentsItem from "./PostCommentsItem/PostCommentsItem";
import Skeleton from "../../../../components/Skeleton/Skeleton";
import { usePostCommentsStore } from "../../../../zustand/post-comments";

interface PostCommentsProps {
  route: any;
}

const PostComments = ({ route }: PostCommentsProps) => {
  const { postId } = route.params as { postId: string };

  const comments = usePostCommentsStore((state) => state.comments);
  const error = usePostCommentsStore((state) => state.error);
  const loading = usePostCommentsStore((state) => state.loading);
  const fetchComments = usePostCommentsStore((state) => state.fetchComments);

  useEffect(() => {
    fetchComments(postId);
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
