import { View } from "react-native";
import { Checkbox } from "react-native-paper";

import { useUserStore } from "../../../../zustand/user";

const SettingsStackContent = () => {
  const user = useUserStore((store) => store.user);
  const updateUser = useUserStore((store) => store.updateUser);

  return (
    <View style={{ padding: 10 }}>
      <Checkbox.Item
        label="otrzymywanie powiadomień"
        status={user?.emailNotifications ? "checked" : "unchecked"}
        onPress={() => {
          if (user) {
            updateUser(user);
          }
        }}
        position="leading"
      />
    </View>
  );
};

export default SettingsStackContent;
