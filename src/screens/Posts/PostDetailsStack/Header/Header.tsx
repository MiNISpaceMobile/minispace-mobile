import { View } from "react-native";
import { useTheme, Text } from "react-native-paper";

interface HeaderProps {
  route: any;
  navigation: any;
  title: string;
}

const Header = ({ route, navigation, title }: HeaderProps) => {
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
        {title}
      </Text>
    </View>
  );
};

export default Header;
