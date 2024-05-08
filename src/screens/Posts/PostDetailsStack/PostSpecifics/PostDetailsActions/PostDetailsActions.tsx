import { useState } from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";

import PostDetailsReportDialog from "./PostDetailsReportDialog/PostDetailsReportDialog";

// TODO: implement action buttons
const PostDetailsActions = () => {
  const [reportDialogVisible, setReportDialogVisible] = useState(false);

  const setReportDialogVisibleHandler = (newReportDialogVisible: boolean) => {
    setReportDialogVisible(newReportDialogVisible);
  };

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
      >
        Zgłoś
      </Button>
      <Button
        icon="book-cancel"
        mode="contained"
        style={{ margin: 10 }}
        onPress={() => {}}
      >
        Opuść
      </Button>
      <Button
        icon="book"
        mode="contained"
        style={{ margin: 10 }}
        onPress={() => {}}
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
