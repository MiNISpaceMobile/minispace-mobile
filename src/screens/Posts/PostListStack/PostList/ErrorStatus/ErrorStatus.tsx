import { RefreshControl } from "react-native";
import { useTheme, Text } from "react-native-paper";

interface ErrorStatusProps {
  refreshing: boolean;
  onRefresh: () => void;
}

const ErrorStatus = ({ refreshing, onRefresh }: ErrorStatusProps) => {
  const theme = useTheme();

  return (
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
        Problem z wczytaniem danych.
      </Text>
    </RefreshControl>
  );
};

export default ErrorStatus;
