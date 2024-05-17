import { useState } from "react";
import { View } from "react-native";
import {
  Button,
  Dialog,
  HelperText,
  Portal,
  Text,
  TextInput,
} from "react-native-paper";

import ReportDialogAcknowledgement from "./ReportDialogAcknowledgement/ReportDialogAcknowledgement";

interface ReportDialogProps {
  dialogVisible: boolean;
  hideDialog: () => void;
  label: string;
  postReport: (reportContent: string) => void;
}

const ReportDialog = ({
  dialogVisible,
  hideDialog,
  label,
  postReport,
}: ReportDialogProps) => {
  const [reportContent, setReportContent] = useState("");
  const [acknowledgementDialogVisible, setAcknowledgementDialogVisible] =
    useState(false);

  const reportDialogHasErrors = () => {
    return reportContent.length === 0;
  };

  return (
    <View>
      <Portal>
        <Dialog visible={dialogVisible} onDismiss={hideDialog}>
          <Dialog.Title>Przesyłanie zgłoszenia</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium" style={{ marginBottom: 10 }}>
              {label}
            </Text>
            <TextInput
              label="Treść zgłoszenia"
              value={reportContent}
              onChangeText={(content) => setReportContent(content)}
              mode="outlined"
              numberOfLines={10}
              multiline
            />
            <HelperText type="error" visible={reportDialogHasErrors()}>
              Zgłoszenie nie może być puste!
            </HelperText>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={() => {
                if (!reportDialogHasErrors()) {
                  postReport(reportContent);
                  hideDialog();
                  setAcknowledgementDialogVisible(true);
                  setReportContent("");
                }
              }}
            >
              Zgłoś
            </Button>
            <Button onPress={hideDialog}>Zamknij</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <ReportDialogAcknowledgement
        dialogVisible={acknowledgementDialogVisible}
        hideDialog={() => setAcknowledgementDialogVisible(false)}
      />
    </View>
  );
};

export default ReportDialog;
