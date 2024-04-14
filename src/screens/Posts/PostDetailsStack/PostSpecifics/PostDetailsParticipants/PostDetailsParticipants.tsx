import { View } from "react-native";
import { Chip } from "react-native-paper";

// TODO: fetch data and implement participants list
const PostDetailsParticipants = () => {
  return (
    <View
      style={{
        marginBottom: 10,
      }}
    >
      <Chip icon="information" onPress={() => {}}>
        112 osób weźmie udział, w tym 5 znajomych
      </Chip>
    </View>
  );
};

export default PostDetailsParticipants;
