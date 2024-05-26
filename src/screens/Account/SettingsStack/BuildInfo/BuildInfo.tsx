import Constants from "expo-constants";
import { View } from "react-native";
import { Text } from "react-native-paper";

const BuildInfo = () => {
  return (
    <View style={{ position: "absolute", bottom: 35 }}>
      <Text variant="bodySmall">
        Version: {Constants.manifest2.extra.expoClient.version}
      </Text>
      <Text variant="bodySmall">Build: {Constants.manifest2.id}</Text>
      <Text variant="bodySmall">Time: {Constants.manifest2.createdAt}</Text>
    </View>
  );
};

export default BuildInfo;
