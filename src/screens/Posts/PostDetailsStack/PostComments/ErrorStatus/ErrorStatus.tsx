import { View } from "react-native";
import { useTheme, Text } from "react-native-paper";

const ErrorStatus = () => {
  const theme = useTheme();

  return (
    <View>
      <Text style={{ color: theme.colors.error }} variant="titleLarge">
        Problem z wczytaniem komentarzy.
      </Text>
    </View>
  );
};

export default ErrorStatus;
