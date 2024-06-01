import { useEffect, useState } from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";

import { useCreatePostStore } from "../../../../zustand/create-post";

interface CreatePostButtonsProps {
  navigation: any;
}

const CreatePostButtons = ({ navigation }: CreatePostButtonsProps) => {
  const [canCreatePost, setCanCreatePost] = useState(false);

  const createPost = useCreatePostStore((state) => state.createPost);
  const postCreator = useCreatePostStore((state) => state.postCreator);
  const clear = useCreatePostStore((state) => state.clear);
  const hasErrors = useCreatePostStore((state) => state.hasErrors);

  useEffect(() => {
    setCanCreatePost(!hasErrors());
  }, [postCreator]);

  return (
    <View
      style={{
        paddingVertical: 10,
        flexDirection: "row",
        paddingHorizontal: 30,
      }}
    >
      <Button
        style={{ flex: 1, marginHorizontal: 10 }}
        mode="outlined"
        onPress={clear}
      >
        Wyczyść
      </Button>
      <Button
        style={{ flex: 1, marginHorizontal: 10 }}
        mode="outlined"
        onPress={async () => {
          await createPost();
          clear();
          navigation.goBack();
        }}
        disabled={canCreatePost === false}
      >
        Stwórz
      </Button>
    </View>
  );
};

export default CreatePostButtons;
