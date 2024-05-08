import { View } from "react-native";
import { Button, Dialog, Portal } from "react-native-paper";

interface PostDetailsReportDialogAcknowledgementProps {
  acknowledgementDialogVisible: boolean;
  setAcknowledgementDialogVisibleHandler: (
    newAcknowledgementDialogVisible: boolean,
  ) => void;
}

const PostDetailsReportDialogAcknowledgement = ({
  acknowledgementDialogVisible,
  setAcknowledgementDialogVisibleHandler,
}: PostDetailsReportDialogAcknowledgementProps) => {
  return (
    <View>
      <Portal>
        <Dialog
          visible={acknowledgementDialogVisible}
          onDismiss={() => setAcknowledgementDialogVisibleHandler(false)}
        >
          <Dialog.Title>Dziękujemy za zgłoszenie!</Dialog.Title>
          <Dialog.Actions>
            <Button
              onPress={() => setAcknowledgementDialogVisibleHandler(false)}
            >
              Zamknij
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default PostDetailsReportDialogAcknowledgement;
