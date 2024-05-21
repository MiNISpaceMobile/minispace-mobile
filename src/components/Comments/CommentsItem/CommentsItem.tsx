import "moment/locale/pl";
import { View } from "react-native";
import { useTheme } from "react-native-paper";

import CommentsItemActions from "./CommentsItemActions/CommentsItemActions";
import CommentsItemContent from "./CommentsItemContent/CommentsItemContent";
import CommentsItemHeader from "./CommentsItemHeader/CommentsItemHeader";
import IComment from "../../../interfaces/Comment";

interface CommentsItemProps {
  comment: IComment;
}

const CommentsItem = ({ comment }: CommentsItemProps) => {
  const theme = useTheme();

  return (
    <View style={{ padding: 10, paddingBottom: 0 }}>
      <CommentsItemHeader comment={comment} />
      <CommentsItemContent comment={comment} />
      <CommentsItemActions comment={comment} />
      <View
        style={{
          borderLeftWidth: comment.replies.length > 0 ? 1 : 0,
          borderColor: theme.colors.primaryContainer,
        }}
      >
        <View style={{ marginLeft: 15 }}>
          {comment.replies.map((comment) => (
            <CommentsItem comment={comment} key={comment.id} />
          ))}
        </View>
      </View>
    </View>
  );
};

export default CommentsItem;