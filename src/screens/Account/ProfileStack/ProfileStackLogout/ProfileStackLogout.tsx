import { View } from "react-native";
import { Button, useTheme } from "react-native-paper";

import { useAuthStore } from "../../../../zustand/auth";
import { useUserStore } from "../../../../zustand/user";

const ProfileStackLogout = () => {
  const deleteJwt = useAuthStore((state) => state.deleteJwt);
  const setAuthVisible = useAuthStore((state) => state.setAuthVisible);
  const clearUser = useUserStore((state) => state.clearUser);
  const user = useUserStore((state) => state.user);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={{ position: "absolute", bottom: 70, alignItems: "center" }}>
        <Button
          icon="logout"
          mode="outlined"
          buttonColor={useTheme().colors.error}
          textColor={useTheme().colors.onError}
          onPress={() => {
            if (user) {
              clearUser();
              deleteJwt();
            }
            setAuthVisible(true);
          }}
        >
          {user ? "Wyloguj się" : "Opuść widok gościa"}
        </Button>
      </View>
    </View>
  );
};

export default ProfileStackLogout;
