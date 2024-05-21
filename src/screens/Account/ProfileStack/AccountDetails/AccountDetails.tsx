import { useEffect, useState } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

import ProfilePicture from "../../../../components/ProfilePicture/ProfilePicture";
import { useUserStore } from "../../../../zustand/user";

const AccountDetails = () => {
  const [firstName, setFirstName] = useState<string | null>(null);
  const [lastName, setLastName] = useState<string | null>(null);

  const user = useUserStore((state) => state.user);

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
    }
  }, [user]);

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "center",
        marginTop: 70,
      }}
    >
      <View style={{ marginRight: 20 }}>
        <ProfilePicture size={100} />
      </View>
      <View style={{ flexDirection: "column" }}>
        <Text variant="displayMedium" style={{ fontWeight: "bold" }}>
          {firstName}
        </Text>
        <Text variant="displayMedium" style={{ fontWeight: "bold" }}>
          {lastName}
        </Text>
      </View>
    </View>
  );
};

export default AccountDetails;
