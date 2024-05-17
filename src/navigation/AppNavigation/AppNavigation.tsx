import { NavigationContainer } from "@react-navigation/native";
import { useState } from "react";
import { useTheme } from "react-native-paper";

import Authentication from "../../screens/Authentication/Authentication";
import MainTabs from "../MainTabs/MainTabs";

const AppNavigation = () => {
  const [authVisible, setAuthVisible] = useState(true);

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
