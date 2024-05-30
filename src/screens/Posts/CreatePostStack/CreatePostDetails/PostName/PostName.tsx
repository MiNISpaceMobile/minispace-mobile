import { View } from "react-native";
import { HelperText, TextInput } from "react-native-paper";

import { useCreatePostStore } from "../../../../../zustand/create-post";

const PostName = () => {
  const postCreator = useCreatePostStore((state) => state.postCreator);
  const updatePostCreator = useCreatePostStore(
    (state) => state.updatePostCreator,
  );

  const hasErrors = () => {
    return postCreator.title.length === 0;
  };

  return (
    <View>
      <TextInput
        label="Nazwa postu"
        value={postCreator.title}
        onChangeText={(title) => updatePostCreator({ ...postCreator, title })}
      />
      <HelperText visible={hasErrors()} type="error">
        Nazwa postu nie może być pusta!
      </HelperText>
    </View>
  );
};

export default PostName;
