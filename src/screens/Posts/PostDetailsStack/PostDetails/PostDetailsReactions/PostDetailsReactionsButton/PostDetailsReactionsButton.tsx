import { IconButton } from "react-native-paper";

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
    <IconButton
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
  );
};

export default PostDetailsReactionsButton;
