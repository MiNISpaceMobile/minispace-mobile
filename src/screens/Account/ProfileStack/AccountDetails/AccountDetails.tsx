import { useEffect, useState } from "react";
import { View } from "react-native";
import { Icon, Text, TouchableRipple } from "react-native-paper";

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
        flex: 1,
      }}
    >
      <>
        <View style={{ marginRight: 20 }}>
          <ProfilePicture size={100} />
          {user && (
            <TouchableRipple
              style={{
                position: "absolute",
                bottom: -5,
                right: -5,
                borderRadius: 12,
                backgroundColor: "white",
                elevation: 2,
                padding: 4,
              }}
              onPress={() => {}} // TODO: implement profile picture change
              disabled={user === null}
              borderless
            >
              <Icon source="pencil" size={28} />
            </TouchableRipple>
          )}
        </View>
      </>
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
