import { View } from "react-native";
import { Text } from "react-native-paper";

import ProfilePicture from "../../../../components/ProfilePicture/ProfilePicture";
import { useUserStore } from "../../../../zustand/user";

const AccountDetails = () => {
  const user = useUserStore((state) => state.user);

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "center",
      }}
    >
      <View>
        <ProfilePicture size={100} />
      </View>
      <View style={{ flexDirection: "column" }}>
        <Text variant="displayMedium" style={{ fontWeight: "600" }}>
          {user?.firstName}
        </Text>
        <Text variant="displayMedium" style={{ fontWeight: "600" }}>
          {user?.lastName}
        </Text>
      </View>
    </View>
  );
};

export default AccountDetails;
