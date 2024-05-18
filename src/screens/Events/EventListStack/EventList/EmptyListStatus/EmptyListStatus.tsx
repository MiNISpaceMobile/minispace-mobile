import { RefreshControl, View } from "react-native";
import { Text } from "react-native-paper";

interface EmptyListStatusProps {
  refreshing: boolean;
  onRefresh: () => void;
}

const EmptyListStatus = ({ refreshing, onRefresh }: EmptyListStatusProps) => {
  return (
    <View testID="emptylist-status">
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh}>
        <Text
          style={{
            padding: 30,
            minHeight: "100%",
            textAlign: "center",
          }}
          variant="titleLarge"
        >
          Nie znaleziono żadnego wydarzenia.
        </Text>
      </RefreshControl>
    </View>
  );
};

export default EmptyListStatus;
