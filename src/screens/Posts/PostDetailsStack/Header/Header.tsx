import { useEffect, useState } from "react";
import { View } from "react-native";
import { useTheme, Text, IconButton } from "react-native-paper";

import Skeleton from "../../../../components/Skeleton/Skeleton";
import { usePostDetailsStore } from "../../../../zustand/post-details";

interface HeaderProps {
  route: any;
  navigation: any;
}

const Header = ({ route, navigation }: HeaderProps) => {
  const theme = useTheme();

  const postDetails = usePostDetailsStore((state) => state.postDetails);
  const loading = usePostDetailsStore((state) => state.loading);

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
      <Skeleton loading={loading} height={40} width="80%">
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <IconButton
            icon="arrow-left"
            size={32}
            iconColor={theme.colors.onPrimary}
            onPress={() => navigation.navigate("PostList")}
            style={{ flex: 1 }}
          />
          <Text
            variant="headlineLarge"
            style={{
              color: theme.colors.onPrimary,
              fontWeight: "bold",
              flex: 8,
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
