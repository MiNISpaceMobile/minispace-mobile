import { useState } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

import PostDetailsReactionsButton from "./PostDetailsReactionsButton/PostDetailsReactionsButton";

export type ReactionType =
  | null
  | "thumb-up"
  | "cards-heart"
  | "emoticon-lol"
  | "emoticon-cry";

const PostDetailsReactions = () => {
  const [selectedReaction, setSelectedReaction] = useState<ReactionType>(null);

  const setSelectedReactionHandler = (newSelectedReaction: ReactionType) => {
    setSelectedReaction(newSelectedReaction);
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      <PostDetailsReactionsButton
        icon="thumb-up"
        selectedReaction={selectedReaction}
        setSelectedReactionHandler={setSelectedReactionHandler}
      />
      <PostDetailsReactionsButton
        icon="cards-heart"
        selectedReaction={selectedReaction}
        setSelectedReactionHandler={setSelectedReactionHandler}
      />
      <PostDetailsReactionsButton
        icon="emoticon-lol"
        selectedReaction={selectedReaction}
        setSelectedReactionHandler={setSelectedReactionHandler}
      />
      <PostDetailsReactionsButton
        icon="emoticon-cry"
        selectedReaction={selectedReaction}
        setSelectedReactionHandler={setSelectedReactionHandler}
      />
      <Text variant="titleMedium" style={{ padding: 10 }}>
        45
      </Text>
    </View>
  );
};

export default PostDetailsReactions;
