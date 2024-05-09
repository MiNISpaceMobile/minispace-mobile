import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

interface AuthenticationProps {
  hideAuth: () => void;
}

const Authentication = ({ hideAuth }: AuthenticationProps) => {
  return (
    <SafeAreaView>
      <View>
        <Button onPress={() => {}}>Login with usos</Button>
        <Button onPress={hideAuth}>Login as quest</Button>
      </View>
    </SafeAreaView>
  );
};

export default Authentication;
