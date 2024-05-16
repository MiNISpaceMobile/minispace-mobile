import { View } from "react-native";
import { useTheme, Text } from "react-native-paper";

const Header = () => {
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
        Filtry
      </Text>
    </View>
  );
};

export default Header;
