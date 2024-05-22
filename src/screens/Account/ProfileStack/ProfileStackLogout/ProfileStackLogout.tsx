import { View } from "react-native";
import { Button, useTheme } from "react-native-paper";

const ProfileStackLogout = () => {
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
          onPress={() => {}} // TODO: implement logout
        >
          Wyloguj się
        </Button>
      </View>
    </View>
  );
};

export default ProfileStackLogout;
