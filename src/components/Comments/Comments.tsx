import { AxiosError } from "axios";
import { useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";

import CommentsItem from "./CommentsItem/CommentsItem";
import ErrorStatus from "./ErrorStatus/ErrorStatus";
import IComment from "../../interfaces/Comment";
import createComment from "../../lib/createComment";
import { usePostCommentsStore } from "../../zustand/post-comments";
import CommentDialog from "../CommentDialog/CommentDialog";
import Skeleton from "../Skeleton/Skeleton";

interface CommentsProps {
  comments: IComment[];
  error: AxiosError | null;
  loading: boolean;
  postId: string;
}

const Comments = ({ comments, error, loading, postId }: CommentsProps) => {
  const [commentDialogVisible, setCommentDialogVisible] = useState(false);

  const theme = useTheme();

  const fetchComments = usePostCommentsStore((state) => state.fetchComments);

  return (
    <View style={{ padding: 10 }}>
      <Text variant="titleMedium">Komentarze:</Text>
      {error ? (
        <ErrorStatus />
      ) : comments.length === 0 ? (
        <Text
          style={{
            padding: 30,
            textAlign: "center",
          }}
          variant="titleLarge"
        >
          Brak komentarzy.
        </Text>
      ) : (
        <Skeleton
          loading={loading && comments.length === 0}
          height={100}
          width="100%"
        >
          <View>
            {comments.map((comment) => (
              <CommentsItem
                comment={comment}
                key={comment.id}
                postId={postId}
              />
            ))}
          </View>
        </Skeleton>
      )}
      <Button
        mode="contained-tonal"
        onPress={() => setCommentDialogVisible(true)}
        style={{ width: "50%", alignSelf: "center" }}
      >
        Dodaj komentarz
      </Button>
      <CommentDialog
        dialogVisible={commentDialogVisible}
        hideDialog={() => setCommentDialogVisible(false)}
        createComment={async (content: string) => {
          // create comment
          await createComment(content, postId);

          // fetch comments
          fetchComments(postId);
        }}
      />
    </View>
  );
};

export default Comments;
