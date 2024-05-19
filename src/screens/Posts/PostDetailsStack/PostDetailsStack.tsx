import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { Button, Dialog, Portal, Text } from "react-native-paper";

import PostComments from "./PostComments/PostComments";
import PostSpecifics from "./PostSpecifics/PostSpecifics";
import Header from "../../../components/Header/Header";
import IPost from "../../../interfaces/Post";
import { useNavigationStore } from "../../../zustand/navigation";
import { usePostDetailsStore } from "../../../zustand/post-details";

interface PostDetailsStackProps {
  route: any;
  navigation: any;
}

const PostDetailsStack = ({ route, navigation }: PostDetailsStackProps) => {
  const { post } = route.params as { post: IPost };

  const [errorDialogVisible, setErrorDialogVisible] = useState(false);

  const error = usePostDetailsStore((state) => state.error);
  const fetchPostDetails = usePostDetailsStore(
    (state) => state.fetchPostDetails,
  );

  const postDetails = usePostDetailsStore((state) => state.postDetails);
  const loading = usePostDetailsStore((state) => state.loading);

  useEffect(() => {
    fetchPostDetails(post.id);
  }, []);

  useEffect(() => {
    setErrorDialogVisible(error !== null);
  }, [error]);

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
      navigation.navigate("PostList");
    });
  }, [navigation]);

  const goBack = () => {
    setErrorDialogVisible(false);
    navigation.navigate("PostList");
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
        loading={loading}
        title={title}
        navigateRouteName="PostList"
        iconVariant="left"
        leftIcon="arrow-left"
      />
      <PostSpecifics route={route} navigation={navigation} />
      <PostComments route={route} />
    </ScrollView>
  );
};

export default PostDetailsStack;
