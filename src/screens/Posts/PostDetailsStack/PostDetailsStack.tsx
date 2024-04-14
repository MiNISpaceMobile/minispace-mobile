import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { Button, Dialog, Portal, Text } from "react-native-paper";

import Header from "./Header/Header";
import PostComments from "./PostComments/PostComments";
import PostSpecifics from "./PostSpecifics/PostSpecifics";
import Post from "../../../interfaces/Post";
import { useNavigationStore } from "../../../zustand/navigation";
import { usePostDetailsStore } from "../../../zustand/post-details";

interface PostDetailsStackProps {
  route: any;
  navigation: any;
}

const PostDetailsStack = ({ route, navigation }: PostDetailsStackProps) => {
  const { post } = route.params as { post: Post };

  const [errorDialogVisible, setErrorDialogVisible] = useState(false);

  const error = usePostDetailsStore((state) => state.error);
  const fetchPostDetails = usePostDetailsStore(
    (state) => state.fetchPostDetails,
  );

  useEffect(() => {
    fetchPostDetails(post.id);
  }, []);

  useEffect(() => {
    setErrorDialogVisible(error !== null);
  }, [error]);

  const setDisplay = useNavigationStore((state) => state.setDisplay);

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
      <Header />
      <PostSpecifics route={route} navigation={navigation} />
      <PostComments route={route} />
    </ScrollView>
  );
};

export default PostDetailsStack;
