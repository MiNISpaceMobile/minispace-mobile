import { useState } from "react";
import { View } from "react-native";
import { IconButton, Text } from "react-native-paper";

import ReportDialog from "../../../ReportDialog/ReportDialog";

interface CommentsItemActionsProps {
  likes: number;
  isReply?: boolean;
}

const CommentsItemActions = ({ likes, isReply }: CommentsItemActionsProps) => {
  const [reportDialogVisible, setReportDialogVisible] = useState(false);

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      <IconButton
        icon="flag"
        size={24}
        onPress={() => setReportDialogVisible(true)}
      />
      {isReply !== true && (
        <IconButton icon="reply" size={24} onPress={() => {}} />
      )}
      <IconButton icon="thumb-up-outline" size={24} onPress={() => {}} />
      <Text variant="titleMedium">{likes}</Text>
      <ReportDialog
        dialogVisible={reportDialogVisible}
        hideDialog={() => setReportDialogVisible(false)}
        label="Napisz w jaki sposób komentarz, który zgłaszasz jest sprzeczny z regulaminem aplikacji:"
        // TODO: send report request
        postReport={() => {}}
      />
    </View>
  );
};

export default CommentsItemActions;
