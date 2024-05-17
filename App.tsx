import "react-native-reanimated";
import "react-native-gesture-handler";

import { PaperProvider } from "react-native-paper";

import AppNavigation from "./src/navigation/AppNavigation/AppNavigation";

export default () => {
  return (
    <PaperProvider>
      <AppNavigation />
    </PaperProvider>
  );
};
