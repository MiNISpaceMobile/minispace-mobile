import { View } from "react-native";
import { useTheme, Text, IconButton } from "react-native-paper";

interface HeaderProps {
  route: any;
  navigation: any;
}

const Header = ({ route, navigation }: HeaderProps) => {
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
      <Text
        variant="headlineLarge"
        style={{
          color: theme.colors.onPrimary,
          fontWeight: "bold",
        }}
      >
        Wydarzenia
      </Text>
      <IconButton
        icon="filter"
        iconColor={theme.colors.onPrimary}
        size={32}
        onPress={() => {
          navigation.navigate("Filter");
        }}
        style={{
          position: "absolute",
          right: 10,
        }}
      />
    </View>
  );
};

export default Header;
