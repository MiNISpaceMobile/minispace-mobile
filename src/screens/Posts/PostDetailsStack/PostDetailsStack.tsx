import { View } from "react-native";
import { Text } from "react-native-paper";

import Post from "../../../interfaces/Post";

interface PostDetailsStackProps {
  route: any;
  navigation: any;
}

const PostDetailsStack = ({ route, navigation }: PostDetailsStackProps) => {
  const { post } = route.params as { post: Post };

  return (
    <View>
      <Text>{post.title}</Text>
      <Text>{post.content}</Text>
    </View>
  );
};

export default PostDetailsStack;
