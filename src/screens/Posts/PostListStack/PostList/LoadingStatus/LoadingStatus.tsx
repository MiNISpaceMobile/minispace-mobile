import { View } from "react-native";
import { ActivityIndicator, useTheme } from "react-native-paper";

interface LoadingStatusProps {
  loading: boolean;
}

const LoadingStatus = ({ loading }: LoadingStatusProps) => {
  const theme = useTheme();

  return (
    <View
      style={{
        padding: 30,
      }}
    >
      <ActivityIndicator
        animating={loading}
        size={48}
        color={theme.colors.secondary}
        testID="loading-status"
      />
    </View>
  );
};

export default LoadingStatus;
