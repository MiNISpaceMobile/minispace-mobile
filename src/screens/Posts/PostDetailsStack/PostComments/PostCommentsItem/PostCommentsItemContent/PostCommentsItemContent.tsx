import { Text } from "react-native-paper";

import IComment from "../../../../../../interfaces/Comment";

interface PostCommentsItemContentProps {
  comment: IComment;
}

const PostCommentsItemContent = ({ comment }: PostCommentsItemContentProps) => {
  return <Text>{comment.content}</Text>;
};

export default PostCommentsItemContent;
