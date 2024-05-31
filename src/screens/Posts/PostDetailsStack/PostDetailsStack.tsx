import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { Button, Dialog, Portal, Text } from "react-native-paper";

import PostSpecifics from "./PostSpecifics/PostSpecifics";
import Comments from "../../../components/Comments/Comments";
import Header from "../../../components/Header/Header";
import { useNavigationStore } from "../../../zustand/navigation";
import { usePostCommentsStore } from "../../../zustand/post-comments";
import { usePostDetailsStore } from "../../../zustand/post-details";

interface PostDetailsStackProps {
  route: any;
  navigation: any;
}

const PostDetailsStack = ({ route, navigation }: PostDetailsStackProps) => {
  const { postId } = route.params as { postId: string };

  const postCommentsError = usePostCommentsStore((state) => state.error);
  const fetchComments = usePostCommentsStore((state) => state.fetchComments);

  const comments = usePostCommentsStore((state) => state.comments);
  const postCommentsLoading = usePostCommentsStore((state) => state.loading);

  const [errorDialogVisible, setErrorDialogVisible] = useState(false);

  const postDetailsError = usePostDetailsStore((state) => state.error);
  const fetchPostDetails = usePostDetailsStore(
    (state) => state.fetchPostDetails,
  );

  const postDetails = usePostDetailsStore((state) => state.postDetails);
  const postDetailsLoading = usePostDetailsStore((state) => state.loading);

  useEffect(() => {
    fetchPostDetails(postId);
    fetchComments(postId);
  }, []);

  useEffect(() => {
    setErrorDialogVisible(postDetailsError !== null);
  }, [postDetailsError]);

  const setDisplay = useNavigationStore((state) => state.setDisplay);

  const [title, setTitle] = useState<null | string>(null);

  useEffect(() => {
    if (postDetails !== null) {
      setTitle(postDetails.eventTitle);
    }
  }, [postDetails]);

  useEffect(() => {
    setDisplay("none");

    // https://stackoverflow.com/a/64789273
    const unsubscribe = navigation.addListener("beforeRemove", (e: any) => {
      e.preventDefault();
      unsubscribe();
      setDisplay("flex");
      navigation.goBack();
    });
  }, [navigation]);

  const goBack = () => {
    setErrorDialogVisible(false);
    navigation.goBack();
  };

  return (
    <ScrollView>
      <Portal>
        <Dialog visible={errorDialogVisible} dismissable={false}>
          <Dialog.Title>Błąd podczas ładowania</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">
              Podczas wczytywania nastąpił błąd. Wróć do listy postów i spróbuj
              ponownie. Jeżeli błąd nadal będzie występował skontaktuj się z
              administratorem.
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={goBack}>Wróć</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <Header
        navigation={navigation}
        loading={postDetailsLoading}
        title={title}
        navigateRouteName="PostList"
        iconVariant="left"
        leftIcon="arrow-left"
      />
      <PostSpecifics route={route} navigation={navigation} />
      <Comments
        comments={comments}
        error={postCommentsError}
        loading={postCommentsLoading}
        postId={postId}
      />
    </ScrollView>
  );
};

export default PostDetailsStack;
