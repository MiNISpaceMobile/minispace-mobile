import { useEffect, useState } from "react";
import { View } from "react-native";
import { useTheme, Text } from "react-native-paper";

import Skeleton from "../../../../components/Skeleton/Skeleton";
import PostDetails from "../../../../interfaces/PostDetails";

interface HeaderProps {
  postDetails: null | PostDetails;
  loading: boolean;
}

const Header = ({ postDetails, loading }: HeaderProps) => {
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
      <Skeleton loading={loading} height={40} width="80%">
        <Text
          variant="headlineLarge"
          style={{ color: theme.colors.onPrimary, fontWeight: "bold" }}
        >
          {title}
        </Text>
      </Skeleton>
    </View>
  );
};

export default Header;
