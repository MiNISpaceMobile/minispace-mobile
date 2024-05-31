import { useState } from "react";
import { View } from "react-native";
import {
  Button,
  Dialog,
  HelperText,
  Portal,
  TextInput,
} from "react-native-paper";

import CommentDialogAcknowledgement from "./CommentDialogAcknowledgement/CommentDialogAcknowledgement";

interface CommentDialogProps {
  dialogVisible: boolean;
  hideDialog: () => void;
  createComment: (content: string) => void;
}

const CommentDialog = ({
  dialogVisible,
  hideDialog,
  createComment,
}: CommentDialogProps) => {
  const [commentContent, setCommentContent] = useState("");
  const [acknowledgementDialogVisible, setAcknowledgementDialogVisible] =
    useState(false);

  const commentDialogHasErrors = () => {
    return commentContent.length === 0;
  };

  return (
    <View>
      <Portal>
        <Dialog visible={dialogVisible} onDismiss={hideDialog}>
          <Dialog.Title>Komentarz</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Treść zgłoszenia"
              value={commentContent}
              onChangeText={(content) => setCommentContent(content)}
              mode="outlined"
              numberOfLines={10}
              multiline
            />
            <HelperText type="error" visible={commentDialogHasErrors()}>
              Komentarz nie może być pusty!
            </HelperText>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={() => {
                if (!commentDialogHasErrors()) {
                  createComment(commentContent);
                  hideDialog();
                  setAcknowledgementDialogVisible(true);
                  setCommentContent("");
                }
              }}
            >
              Odpowiedz
            </Button>
            <Button onPress={hideDialog}>Zamknij</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <CommentDialogAcknowledgement
        dialogVisible={acknowledgementDialogVisible}
        hideDialog={() => setAcknowledgementDialogVisible(false)}
      />
    </View>
  );
};

export default CommentDialog;
