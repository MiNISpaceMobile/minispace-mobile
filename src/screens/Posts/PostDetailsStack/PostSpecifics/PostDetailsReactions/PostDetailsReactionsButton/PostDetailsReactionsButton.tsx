import { View } from "react-native";
import { IconButton, Text } from "react-native-paper";

import { ReactionType } from "../PostDetailsReactions";

interface PostDetailsReactionsButtonProps {
  icon: ReactionType;
  selectedReaction: ReactionType;
  setSelectedReactionHandler: (newSelectedReaction: ReactionType) => void;
}

const PostDetailsReactionsButton = ({
  icon,
  selectedReaction,
  setSelectedReactionHandler,
}: PostDetailsReactionsButtonProps) => {
  return (
    <View
      style={{
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <IconButton
        style={{ marginBottom: -5 }}
        icon={icon + (icon === selectedReaction ? "" : "-outline")}
        mode={icon === selectedReaction ? "contained-tonal" : undefined}
        size={24}
        onPress={() => {
          if (icon === selectedReaction) {
            setSelectedReactionHandler(null);
          } else {
            setSelectedReactionHandler(icon);
          }
        }}
      />
      <Text>45</Text>
    </View>
  );
};

export default PostDetailsReactionsButton;
