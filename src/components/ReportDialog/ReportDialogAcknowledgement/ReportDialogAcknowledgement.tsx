import { useEffect } from "react";
import { Portal, Snackbar } from "react-native-paper";

interface ReportDialogAcknowledgementProps {
  dialogVisible: boolean;
  hideDialog: () => void;
}

const ReportDialogAcknowledgement = ({
  dialogVisible,
  hideDialog,
}: ReportDialogAcknowledgementProps) => {
  useEffect(() => {
    if (dialogVisible) {
      setTimeout(hideDialog, 5000);
    }
  }, [dialogVisible]);

  return (
    <Portal>
      <Snackbar
        wrapperStyle={{ marginBottom: 10 }}
        visible={dialogVisible}
        onDismiss={hideDialog}
        action={{
          label: "Zamknij",
          onPress: hideDialog,
        }}
      >
        Dziękujemy za zgłoszenie!
      </Snackbar>
    </Portal>
  );
};

export default ReportDialogAcknowledgement;
