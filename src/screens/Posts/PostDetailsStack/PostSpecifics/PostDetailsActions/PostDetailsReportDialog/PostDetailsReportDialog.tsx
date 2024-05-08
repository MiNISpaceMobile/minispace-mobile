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

import PostDetailsReportDialogAcknowledgement from "./PostDetailsReportDialogAcknowledgement/PostDetailsReportDialogAcknowledgement";

interface PostDetailsReportDialogProps {
  reportDialogVisible: boolean;
  setReportDialogVisibleHandler: (newReportDialogVisible: boolean) => void;
}

const PostDetailsReportDialog = ({
  reportDialogVisible,
  setReportDialogVisibleHandler,
}: PostDetailsReportDialogProps) => {
  const [reportContent, setReportContent] = useState("");
  const [acknowledgementDialogVisible, setAcknowledgementDialogVisible] =
    useState(false);

  const setAcknowledgementDialogVisibleHandler = (
    newAcknowledgementDialogVisible: boolean,
  ) => {
    setAcknowledgementDialogVisible(newAcknowledgementDialogVisible);
  };

  const hasErrors = () => {
    return reportContent.length === 0;
  };

  return (
    <View>
      <Portal>
        <Dialog
          visible={reportDialogVisible}
          onDismiss={() => setReportDialogVisibleHandler(false)}
        >
          <Dialog.Title>Przesyłanie zgłoszenia</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium" style={{ marginBottom: 10 }}>
              Napisz w jaki sposób post, który przeglądasz sprzeczny jest z
              regulaminem aplikacji:
            </Text>
            <TextInput
              label="Treść zgłoszenia"
              value={reportContent}
              onChangeText={(content) => setReportContent(content)}
              mode="outlined"
              numberOfLines={10}
              multiline
            />
            <HelperText type="error" visible={hasErrors()}>
              Zgłoszenie nie może być puste!
            </HelperText>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={() => {
                if (!hasErrors()) {
                  // TODO: send report request
                  setReportDialogVisibleHandler(false);
                  setAcknowledgementDialogVisible(true);
                  setReportContent("");
                }
              }}
            >
              Zgłoś
            </Button>
            <Button onPress={() => setReportDialogVisibleHandler(false)}>
              Zamknij
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <PostDetailsReportDialogAcknowledgement
        acknowledgementDialogVisible={acknowledgementDialogVisible}
        setAcknowledgementDialogVisibleHandler={
          setAcknowledgementDialogVisibleHandler
        }
      />
    </View>
  );
};

export default PostDetailsReportDialog;
