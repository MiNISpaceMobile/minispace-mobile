import { View } from "react-native";
import { HelperText, TextInput } from "react-native-paper";

import { useCreatePostStore } from "../../../../../zustand/create-post";

const PostDescription = () => {
  const postCreator = useCreatePostStore((state) => state.postCreator);
  const updatePostCreator = useCreatePostStore(
    (state) => state.updatePostCreator,
  );

  const hasErrors = () => {
    return postCreator.description.length === 0;
  };

  return (
    <View>
      <TextInput
        label="Opis"
        value={postCreator.description}
        onChangeText={(description) =>
          updatePostCreator({ ...postCreator, description })
        }
        numberOfLines={10}
        multiline
      />
      <HelperText visible={hasErrors()} type="error">
        Nazwa postu nie może być pusta!
      </HelperText>
    </View>
  );
};

export default PostDescription;
