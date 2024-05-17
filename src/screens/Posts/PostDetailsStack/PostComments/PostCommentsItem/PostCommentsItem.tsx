import "moment/locale/pl";
import { View } from "react-native";
import { useTheme } from "react-native-paper";

import PostCommentsItemActions from "./PostCommentsItemActions/PostCommentsItemActions";
import PostCommentsItemContent from "./PostCommentsItemContent/PostCommentsItemContent";
import PostCommentsItemHeader from "./PostCommentsItemHeader/PostCommentsItemHeader";
import IPostComment from "../../../../../interfaces/PostComment";

interface PostCommentsItemProps {
  comment: IPostComment;
}

const PostCommentsItem = ({ comment }: PostCommentsItemProps) => {
  const theme = useTheme();

  return (
    <View style={{ padding: 10, paddingBottom: 0 }}>
      <PostCommentsItemHeader comment={comment} />
      <PostCommentsItemContent comment={comment} />
      <PostCommentsItemActions comment={comment} />
      <View
        style={{
          borderLeftWidth: comment.replies.length > 0 ? 1 : 0,
          borderColor: theme.colors.primaryContainer,
        }}
      >
        <View style={{ marginLeft: 15 }}>
          {comment.replies.map((comment) => (
            <PostCommentsItem comment={comment} key={comment.id} />
          ))}
        </View>
      </View>
    </View>
  );
};

export default PostCommentsItem;
