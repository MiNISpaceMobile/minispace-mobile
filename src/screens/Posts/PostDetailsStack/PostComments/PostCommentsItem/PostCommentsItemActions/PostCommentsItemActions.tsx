import { View } from "react-native";
import { IconButton, Text } from "react-native-paper";

import PostComment from "../../../../../../interfaces/PostComment";

interface PostCommentsItemActionsProps {
  comment: PostComment;
}

const PostCommentsItemActions = ({ comment }: PostCommentsItemActionsProps) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      <IconButton icon="flag" size={24} onPress={() => {}} />
      <IconButton icon="reply" size={24} onPress={() => {}} />
      <IconButton icon="thumb-up-outline" size={24} onPress={() => {}} />
      <Text variant="titleMedium">{comment.likes}</Text>
    </View>
  );
};

export default PostCommentsItemActions;
