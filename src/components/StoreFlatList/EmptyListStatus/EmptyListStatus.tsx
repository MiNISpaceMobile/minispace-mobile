import { RefreshControl, View } from "react-native";
import { Text } from "react-native-paper";

interface EmptyListStatusProps {
  refreshing: boolean;
  onRefresh: () => void;
  label: string;
}

const EmptyListStatus = ({
  refreshing,
  onRefresh,
  label,
}: EmptyListStatusProps) => {
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
          {label}
        </Text>
      </RefreshControl>
    </View>
  );
};

export default EmptyListStatus;
