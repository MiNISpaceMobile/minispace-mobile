import { View } from "react-native";
import { useTheme, Text, IconButton } from "react-native-paper";

import Skeleton from "../Skeleton/Skeleton";

interface HeaderProps {
  navigation?: any;
  loading?: boolean;
  title?: string | null;
  navigateRouteName?: string;
}

const Header = ({
  navigation,
  loading,
  title,
  navigateRouteName,
}: HeaderProps) => {
  const theme = useTheme();

  return (
    <View
      style={{
        backgroundColor: theme.colors.primary,
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Skeleton loading={loading ?? false} height={40} width="80%">
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {navigation && navigateRouteName && (
            <IconButton
              icon="arrow-left"
              size={32}
              iconColor={theme.colors.onPrimary}
              onPress={() => navigation.navigate(navigateRouteName)}
              style={{ flex: 1 }}
            />
          )}
          <Text
            variant="headlineLarge"
            style={{
              color: theme.colors.onPrimary,
              fontWeight: "bold",
              flex: navigation && navigateRouteName ? 8 : 0,
            }}
          >
            {title}
          </Text>
        </View>
      </Skeleton>
    </View>
  );
};

export default Header;
