import { Text } from "react-native-paper";

import IPostComment from "../../../../../../interfaces/PostComment";

interface PostCommentsItemContentProps {
  comment: IPostComment;
}

const PostCommentsItemContent = ({ comment }: PostCommentsItemContentProps) => {
  return <Text>{comment.content}</Text>;
};

export default PostCommentsItemContent;
