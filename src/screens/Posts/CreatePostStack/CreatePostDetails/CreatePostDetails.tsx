import { ScrollView } from "react-native-gesture-handler";
import { Divider } from "react-native-paper";

import PostDescription from "./PostDescription/PostDescription";
import PostEventSelect from "./PostEventSelect/PostEventSelect";
import PostName from "./PostName/PostName";

const CreatePostDetails = () => {
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      style={{ padding: 30 }}
    >
      <PostEventSelect />
      <Divider style={{ marginVertical: 20 }} />
      <PostName />
      <Divider style={{ marginVertical: 20 }} />
      <PostDescription />
      <Divider style={{ marginVertical: 20 }} />
    </ScrollView>
  );
};

export default CreatePostDetails;
