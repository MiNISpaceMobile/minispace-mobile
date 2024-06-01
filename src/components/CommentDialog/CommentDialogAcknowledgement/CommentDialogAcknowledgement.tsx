import { useEffect } from "react";
import { Portal, Snackbar } from "react-native-paper";

interface CommentDialogAcknowledgementProps {
  dialogVisible: boolean;
  hideDialog: () => void;
}

const CommentDialogAcknowledgement = ({
  dialogVisible,
  hideDialog,
}: CommentDialogAcknowledgementProps) => {
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
        Dodano komentarz!
      </Snackbar>
    </Portal>
  );
};

export default CommentDialogAcknowledgement;
