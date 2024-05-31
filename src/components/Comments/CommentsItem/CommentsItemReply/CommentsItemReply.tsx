import "moment/locale/pl";
import { View } from "react-native";

import ICommentReply from "../../../../interfaces/CommentReply";
import CommentsItemActions from "../CommentsItemActions/CommentsItemActions";
import CommentsItemContent from "../CommentsItemContent/CommentsItemContent";
import CommentsItemHeader from "../CommentsItemHeader/CommentsItemHeader";

interface CommentsItemReplyProps {
  comment: ICommentReply;
}

const CommentsItemReply = ({ comment }: CommentsItemReplyProps) => {
  return (
    <View style={{ padding: 10, paddingBottom: 0 }}>
      <CommentsItemHeader owner={comment.owner} createdAt={comment.createdAt} />
      <CommentsItemContent content={comment.content} />
      <CommentsItemActions likes={comment.likes} isReply />
    </View>
  );
};

export default CommentsItemReply;
