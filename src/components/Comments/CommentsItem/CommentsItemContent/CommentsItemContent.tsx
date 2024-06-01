import { Text } from "react-native-paper";

interface CommentsItemContentProps {
  content: string;
}

const CommentsItemContent = ({ content }: CommentsItemContentProps) => {
  return <Text>{content}</Text>;
};

export default CommentsItemContent;
