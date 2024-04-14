import { View } from "react-native";
import { Chip } from "react-native-paper";

import Skeleton from "../../../../../components/Skeleton/Skeleton";

interface PostDetailsParticipantsProps {
  loading: boolean;
}

// TODO: fetch data and implement participants list
const PostDetailsParticipants = ({ loading }: PostDetailsParticipantsProps) => {
  return (
    <View style={{ marginBottom: 10 }}>
      <Skeleton loading={loading} height={32}>
        <Chip icon="information" onPress={() => {}}>
          112 osób weźmie udział, w tym 5 znajomych
        </Chip>
      </Skeleton>
    </View>
  );
};

export default PostDetailsParticipants;
