import { Text } from "react-native-paper";

import PostComment from "../../../../../../interfaces/PostComment";

interface PostCommentsItemContentProps {
  comment: PostComment;
}

const PostCommentsItemContent = ({ comment }: PostCommentsItemContentProps) => {
  return <Text>{comment.content}</Text>;
};

export default PostCommentsItemContent;
