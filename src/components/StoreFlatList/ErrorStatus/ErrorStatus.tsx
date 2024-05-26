import { RefreshControl, View } from "react-native";
import { useTheme, Text } from "react-native-paper";

interface ErrorStatusProps {
  refreshing: boolean;
  onRefresh: () => void;
  label: string;
}

const ErrorStatus = ({ refreshing, onRefresh, label }: ErrorStatusProps) => {
  const theme = useTheme();

  return (
    <View testID="error-status">
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh}>
        <Text
          style={{
            padding: 30,
            minHeight: "100%",
            color: theme.colors.error,
            textAlign: "center",
          }}
          variant="titleLarge"
        >
          {label}
        </Text>
      </RefreshControl>
    </View>
  );
};

export default ErrorStatus;
