import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";

import EditProfileStack from "./EditProfileStack/EditProfileStack";
import FriendsStack from "./FriendsStack/FriendsStack";
import ProfileStack from "./ProfileStack/ProfileStack";
import SettingsStack from "./SettingsStack/SettingsStack";

const Stack = createStackNavigator();

const Account = () => {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="Profile"
        children={(props) => (
          <SafeAreaView>
            <ProfileStack {...props} />
          </SafeAreaView>
        )}
      />
      <Stack.Screen
        name="EditProfile"
        children={(props) => (
          <SafeAreaView>
            <EditProfileStack {...props} />
          </SafeAreaView>
        )}
      />
      <Stack.Screen
        name="Friends"
        children={(props) => (
          <SafeAreaView>
            <FriendsStack {...props} />
          </SafeAreaView>
        )}
      />
      <Stack.Screen
        name="Settings"
        children={(props) => (
          <SafeAreaView>
            <SettingsStack {...props} />
          </SafeAreaView>
        )}
      />
    </Stack.Navigator>
  );
};

export default Account;
