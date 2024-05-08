import { useState } from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";

import ReportDialog from "../../../../../components/ReportDialog/ReportDialog";
import { usePostDetailsStore } from "../../../../../zustand/post-details";

// TODO: implement action buttons
const PostDetailsActions = () => {
  const [reportDialogVisible, setReportDialogVisible] = useState(false);

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
      <ReportDialog
        dialogVisible={reportDialogVisible}
        hideDialog={() => setReportDialogVisible(false)}
        label="Napisz w jaki sposób post, który przeglądasz sprzeczny jest z regulaminem aplikacji:"
        // TODO: send report request
        postReport={() => {}}
      />
    </View>
  );
};

export default PostDetailsActions;
