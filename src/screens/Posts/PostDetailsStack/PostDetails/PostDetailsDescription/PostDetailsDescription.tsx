import { View } from "react-native";
import { Text } from "react-native-paper";

interface PostDetailsDescriptionProps {
  title: string;
  content: string;
}

const PostDetailsDescription = ({
  title,
  content,
}: PostDetailsDescriptionProps) => {
  return (
    <View>
      <Text variant="titleLarge">{title}</Text>
      <Text variant="bodyMedium">{content}</Text>
    </View>
  );
};

export default PostDetailsDescription;
