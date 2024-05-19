import { View } from "react-native";
import { useTheme, Text, IconButton } from "react-native-paper";
import { IconSource } from "react-native-paper/lib/typescript/components/Icon";

import Skeleton from "../Skeleton/Skeleton";

interface HeaderProps {
  navigation?: any;
  loading?: boolean;
  title?: string | null;
  navigateRouteName?: string;
  iconVariant?: "left" | "right";
  leftIcon?: IconSource;
  rightIcon?: IconSource;
  goBack?: boolean;
}

const Header = ({
  navigation,
  loading,
  title,
  navigateRouteName,
  iconVariant,
  leftIcon,
  rightIcon,
  goBack,
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
      {iconVariant === "left" &&
        leftIcon &&
        navigation &&
        (navigateRouteName || goBack) && (
          <IconButton
            icon={leftIcon}
            iconColor={theme.colors.onPrimary}
            size={32}
            onPress={() => {
              if (goBack) {
                navigation.goBack();
              } else {
                navigation.navigate(navigateRouteName);
              }
            }}
            style={{ position: "absolute", left: 0 }}
          />
        )}
      <Skeleton
        loading={typeof loading === "undefined" ? false : loading}
        height={40}
        width="80%"
      >
        <Text
          variant="headlineLarge"
          style={{
            color: theme.colors.onPrimary,
            fontWeight: "bold",
          }}
        >
          {title}
        </Text>
      </Skeleton>
      {iconVariant === "right" &&
        rightIcon &&
        navigation &&
        (navigateRouteName || goBack) && (
          <IconButton
            icon={rightIcon}
            iconColor={theme.colors.onPrimary}
            size={32}
            onPress={() => {
              if (goBack) {
                navigation.goBack();
              } else {
                navigation.navigate(navigateRouteName);
              }
            }}
            style={{ position: "absolute", right: 0 }}
          />
        )}
    </View>
  );
};

export default Header;
