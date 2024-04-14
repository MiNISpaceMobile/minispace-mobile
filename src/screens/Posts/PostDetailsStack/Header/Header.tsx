import { useEffect, useState } from "react";
import { View } from "react-native";
import { useTheme, Text } from "react-native-paper";

import PostDetails from "../../../../interfaces/PostDetails";

interface HeaderProps {
  route: any;
  navigation: any;
  postDetails: null | PostDetails;
}

const Header = ({ route, navigation, postDetails }: HeaderProps) => {
  const theme = useTheme();

  const [title, setTitle] = useState<null | string>(null);

  useEffect(() => {
    if (postDetails !== null) {
      setTitle(postDetails.eventTitle);
    }
  }, [postDetails]);

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
