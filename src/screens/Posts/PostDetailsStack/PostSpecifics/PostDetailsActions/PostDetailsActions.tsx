import { useState } from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";

import PostDetailsReportDialog from "./PostDetailsReportDialog/PostDetailsReportDialog";
import { usePostDetailsStore } from "../../../../../zustand/post-details";

// TODO: implement action buttons
const PostDetailsActions = () => {
  const [reportDialogVisible, setReportDialogVisible] = useState(false);

  const setReportDialogVisibleHandler = (newReportDialogVisible: boolean) => {
    setReportDialogVisible(newReportDialogVisible);
  };

  const loading = usePostDetailsStore((state) => state.loading);
  const postDetails = usePostDetailsStore((state) => state.postDetails);

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
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
      <Button
        icon="book-cancel"
        mode="contained"
        style={{ margin: 10 }}
        onPress={() => {}}
        disabled={loading || postDetails === null || !postDetails.subscribed}
      >
        Opuść
      </Button>
      <Button
        icon="book"
        mode="contained"
        style={{ margin: 10 }}
        onPress={() => {}}
        disabled={loading || postDetails === null || postDetails?.subscribed}
      >
        Dołącz
      </Button>
      <PostDetailsReportDialog
        reportDialogVisible={reportDialogVisible}
        setReportDialogVisibleHandler={setReportDialogVisibleHandler}
      />
    </View>
  );
};

export default PostDetailsActions;
