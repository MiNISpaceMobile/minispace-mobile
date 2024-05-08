import { View } from "react-native";
import { Button, Dialog, Portal } from "react-native-paper";

interface ReportDialogAcknowledgementProps {
  dialogVisible: boolean;
  hideDialog: () => void;
}

const ReportDialogAcknowledgement = ({
  dialogVisible,
  hideDialog,
}: ReportDialogAcknowledgementProps) => {
  return (
    <View>
      <Portal>
        <Dialog visible={dialogVisible} onDismiss={hideDialog}>
          <Dialog.Title>Dziękujemy za zgłoszenie!</Dialog.Title>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Zamknij</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default ReportDialogAcknowledgement;
