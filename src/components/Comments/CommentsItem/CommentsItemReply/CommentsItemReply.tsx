import "moment/locale/pl";
import { View } from "react-native";

import ICommentReply from "../../../../interfaces/CommentReply";
import CommentsItemActions from "../CommentsItemActions/CommentsItemActions";
import CommentsItemContent from "../CommentsItemContent/CommentsItemContent";
import CommentsItemHeader from "../CommentsItemHeader/CommentsItemHeader";

interface CommentsItemReplyProps {
  comment: ICommentReply;
  postId: string;
}

const CommentsItemReply = ({ comment, postId }: CommentsItemReplyProps) => {
  return (
    <View style={{ padding: 10, paddingBottom: 0 }}>
      <CommentsItemHeader owner={comment.owner} createdAt={comment.createdAt} />
      <CommentsItemContent content={comment.content} />
      <CommentsItemActions
        likes={comment.likes}
        dislikes={comment.dislikes}
        postId={postId}
        commentId={comment.id}
        userReactionIsDislike={comment.userReactionIsDislike}
        isReply
      />
    </View>
  );
};

export default CommentsItemReply;
