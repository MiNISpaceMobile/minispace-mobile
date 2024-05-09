import { NavigationContainer } from "@react-navigation/native";
import { useEffect } from "react";
import { ActivityIndicator, useTheme } from "react-native-paper";

import { useAuthenticationStore } from "../../zustand/authentication";
import AuthNavigation from "../AuthNavigation/AuthNavigation";

const AppNavigation = () => {
  const fetchToken = useAuthenticationStore((state) => state.fetchToken);
  const user = useAuthenticationStore((state) => state.user);

  useEffect(() => {
    fetchToken();
  }, []);

  return (
    <NavigationContainer theme={useTheme()}>
      {user === null && <ActivityIndicator />}
      {user === false && <AuthNavigation />}
      {user === true && <AppNavigation />}
    </NavigationContainer>
  );
};

export default AppNavigation;
