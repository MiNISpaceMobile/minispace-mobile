import { useState } from "react";
import { View } from "react-native";
import { IconButton, Text } from "react-native-paper";

import createComment from "../../../../lib/createComment";
import { usePostCommentsStore } from "../../../../zustand/post-comments";
import CommentDialog from "../../../CommentDialog/CommentDialog";
import ReportDialog from "../../../ReportDialog/ReportDialog";

interface CommentsItemActionsProps {
  likes: number;
  isReply?: boolean;
  postId: string;
  commentId: string;
}

const CommentsItemActions = ({
  likes,
  isReply,
  postId,
  commentId,
}: CommentsItemActionsProps) => {
  const [reportDialogVisible, setReportDialogVisible] = useState(false);
  const [commentDialogVisible, setCommentDialogVisible] = useState(false);

  const fetchComments = usePostCommentsStore((state) => state.fetchComments);

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      <IconButton
        icon="flag"
        size={24}
        onPress={() => setReportDialogVisible(true)}
      />
      {isReply !== true && (
        <IconButton
          icon="reply"
          size={24}
          onPress={() => setCommentDialogVisible(true)}
        />
      )}
      <IconButton icon="thumb-up-outline" size={24} onPress={() => {}} />
      <Text variant="titleMedium">{likes}</Text>
      <ReportDialog
        dialogVisible={reportDialogVisible}
        hideDialog={() => setReportDialogVisible(false)}
        label="Napisz w jaki sposób komentarz, który zgłaszasz jest sprzeczny z regulaminem aplikacji:"
        // TODO: send report request
        postReport={() => {}}
      />
      <CommentDialog
        dialogVisible={commentDialogVisible}
        hideDialog={() => setCommentDialogVisible(false)}
        createComment={async (content: string) => {
          // create comment
          await createComment(content, postId, commentId);

          // fetch comments
          fetchComments(postId);
        }}
      />
    </View>
  );
};

export default CommentsItemActions;
