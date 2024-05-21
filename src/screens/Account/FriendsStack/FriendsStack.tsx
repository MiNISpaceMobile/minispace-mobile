import { View } from "react-native";
import { Text } from "react-native-paper";

interface FriendsStackProps {
  route: any;
  navigation: any;
}

const FriendsStack = ({ route, navigation }: FriendsStackProps) => {
  return (
    <View>
      <Text>FriendsStack</Text>
    </View>
  );
};

export default FriendsStack;
