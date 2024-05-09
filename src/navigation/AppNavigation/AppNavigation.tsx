import { NavigationContainer } from "@react-navigation/native";
import { useEffect } from "react";
import { ActivityIndicator, useTheme } from "react-native-paper";

import { useAuthenticationStore } from "../../zustand/authentication";
import AuthTabs from "../AuthTabs/AuthTabs";

const AppNavigation = () => {
  const fetchToken = useAuthenticationStore((state) => state.fetchToken);
  const user = useAuthenticationStore((state) => state.user);

  useEffect(() => {
    fetchToken();
  }, []);

  return (
    <NavigationContainer theme={useTheme()}>
      {user === null && <ActivityIndicator />}
      {user === false && <AuthTabs />}
      {user === true && <AppNavigation />}
    </NavigationContainer>
  );
};

export default AppNavigation;
