import { useState } from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";

import PostDetailsReactionsButton from "./PostDetailsReactionsButton/PostDetailsReactionsButton";
import ReportDialog from "../../../../../components/ReportDialog/ReportDialog";
import Skeleton from "../../../../../components/Skeleton/Skeleton";
import { usePostDetailsStore } from "../../../../../zustand/post-details";

export type ReactionType =
  | null
  | "thumb-up"
  | "cards-heart"
  | "emoticon-lol"
  | "emoticon-cry";

const PostDetailsReactions = () => {
  const [selectedReaction, setSelectedReaction] = useState<ReactionType>(null);
  const [reportDialogVisible, setReportDialogVisible] = useState(false);

  const loading = usePostDetailsStore((state) => state.loading);
  const postDetails = usePostDetailsStore((state) => state.postDetails);

  const setSelectedReactionHandler = (newSelectedReaction: ReactionType) => {
    setSelectedReaction(newSelectedReaction);
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
