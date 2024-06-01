import { useEffect, useState } from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";

import PostDetailsReactionsButton from "./PostDetailsReactionsButton/PostDetailsReactionsButton";
import ReportDialog from "../../../../../components/ReportDialog/ReportDialog";
import Skeleton from "../../../../../components/Skeleton/Skeleton";
import { Reaction } from "../../../../../interfaces/PostDetails";
import reactToPost from "../../../../../lib/reactToPost";
import { usePostDetailsStore } from "../../../../../zustand/post-details";

export type ReactionType =
  | null
  | "thumb-up" // like
  | "emoticon-lol" // funny
  | "emoticon-cool" // wow
  | "emoticon-cry" // sad
  | "emoticon-angry"; // angry

const ReactionToReactionType: Record<Reaction, ReactionType> = {
  Like: "thumb-up",
  Funny: "emoticon-lol",
  Wow: "emoticon-cool",
  Sad: "emoticon-cry",
  Angry: "emoticon-angry",
};

const reactionToReactionType = (rt: Reaction | null): ReactionType => {
  switch (rt) {
    case "Like":
      return "thumb-up";
    case "Funny":
      return "emoticon-lol";
    case "Wow":
      return "emoticon-cool";
    case "Sad":
      return "emoticon-cry";
    case "Angry":
      return "emoticon-angry";
    case null:
      return null;
  }
};

const reactionTypeToReaction = (rt: ReactionType): Reaction | null => {
  switch (rt) {
    case "thumb-up":
      return "Like";
    case "emoticon-lol":
      return "Funny";
    case "emoticon-cool":
      return "Wow";
    case "emoticon-cry":
      return "Sad";
    case "emoticon-angry":
      return "Angry";
    case null:
      return null;
  }
};

const PostDetailsReactions = () => {
  const [selectedReaction, setSelectedReaction] = useState<ReactionType>(null);
  const [reportDialogVisible, setReportDialogVisible] = useState(false);

  const loading = usePostDetailsStore((state) => state.loading);
  const postDetails = usePostDetailsStore((state) => state.postDetails);
  const fetchPostReactions = usePostDetailsStore(
    (state) => state.fetchPostReactions,
  );

  useEffect(() => {
    if (postDetails) {
      setSelectedReaction(reactionToReactionType(postDetails.userReaction));
    }
  }, [postDetails]);

  const setSelectedReactionHandler = async (
    newSelectedReaction: ReactionType,
  ) => {
    if (!postDetails) {
      return;
    }

    // patch reaction
    await reactToPost(
      reactionTypeToReaction(newSelectedReaction),
      postDetails.id,
    );

    // fetch post reacions
    fetchPostReactions(postDetails.id);
  };

  return (
    <View style={{ flexDirection: "row" }}>
      <View
        style={{
          justifyContent: "flex-start",
          flex: 1,
          alignSelf: "center",
          marginBottom: -5,
        }}
      >
        <Button
          icon="flag-variant"
          mode="contained"
          style={{ margin: 10 }}
          onPress={() => setReportDialogVisible(true)}
          disabled={loading}
        >
          Zgłoś
        </Button>
      </View>
      <Skeleton loading={loading}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            flex: 1.5,
          }}
        >
          <PostDetailsReactionsButton
            icon="thumb-up"
            selectedReaction={selectedReaction}
            setSelectedReactionHandler={setSelectedReactionHandler}
            reactionCount={postDetails?.reactions.Like}
          />
          <PostDetailsReactionsButton
            icon="emoticon-lol"
            selectedReaction={selectedReaction}
            setSelectedReactionHandler={setSelectedReactionHandler}
            reactionCount={postDetails?.reactions.Funny}
          />
          <PostDetailsReactionsButton
            icon="emoticon-cool"
            selectedReaction={selectedReaction}
            setSelectedReactionHandler={setSelectedReactionHandler}
            reactionCount={postDetails?.reactions.Wow}
          />
          <PostDetailsReactionsButton
            icon="emoticon-cry"
            selectedReaction={selectedReaction}
            setSelectedReactionHandler={setSelectedReactionHandler}
            reactionCount={postDetails?.reactions.Sad}
          />
          <PostDetailsReactionsButton
            icon="emoticon-angry"
            selectedReaction={selectedReaction}
            setSelectedReactionHandler={setSelectedReactionHandler}
            reactionCount={postDetails?.reactions.Angry}
          />
        </View>
      </Skeleton>
      <ReportDialog
        dialogVisible={reportDialogVisible}
        hideDialog={() => setReportDialogVisible(false)}
        label="Napisz w jaki sposób post, który przeglądasz jest sprzeczny z regulaminem aplikacji:"
        // TODO: send report request
        postReport={() => {}}
      />
    </View>
  );
};

export default PostDetailsReactions;
