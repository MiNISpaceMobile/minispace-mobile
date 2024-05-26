import { NavigationContainer } from "@react-navigation/native";
import { useTheme } from "react-native-paper";

import Authentication from "../../screens/Authentication/Authentication";
import { useAuthStore } from "../../zustand/auth";
import MainTabs from "../MainTabs/MainTabs";

const AppNavigation = () => {
  const authVisible = useAuthStore((state) => state.authVisible);
  const setAuthVisible = useAuthStore((state) => state.setAuthVisible);

  const hideAuth = () => {
    setAuthVisible(false);
  };

  return (
    <NavigationContainer theme={useTheme()}>
      {authVisible === true ? (
        <Authentication hideAuth={hideAuth} />
      ) : (
        <MainTabs />
      )}
    </NavigationContainer>
  );
};

export default AppNavigation;
