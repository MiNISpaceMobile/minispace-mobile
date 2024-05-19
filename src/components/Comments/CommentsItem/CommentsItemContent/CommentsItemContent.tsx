import { Text } from "react-native-paper";

import IComment from "../../../../interfaces/Comment";

interface CommentsItemContentProps {
  comment: IComment;
}

const CommentsItemContent = ({ comment }: CommentsItemContentProps) => {
  return <Text>{comment.content}</Text>;
};

export default CommentsItemContent;
