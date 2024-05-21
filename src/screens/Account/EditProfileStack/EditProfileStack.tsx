import { View } from "react-native";
import { Text } from "react-native-paper";

interface EditProfileStackProps {
  route: any;
  navigation: any;
}

const EditProfileStack = ({ route, navigation }: EditProfileStackProps) => {
  return (
    <View>
      <Text>EditProfileStack</Text>
    </View>
  );
};

export default EditProfileStack;
