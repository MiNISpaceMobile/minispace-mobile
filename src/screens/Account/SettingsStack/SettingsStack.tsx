import { View } from "react-native";
import { Text } from "react-native-paper";

interface SettingsStackProps {
  route: any;
  navigation: any;
}

const SettingsStack = ({ route, navigation }: SettingsStackProps) => {
  return (
    <View>
      <Text>SettingsStack</Text>
    </View>
  );
};

export default SettingsStack;
