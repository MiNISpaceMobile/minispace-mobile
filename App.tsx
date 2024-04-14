import "react-native-reanimated";
import "react-native-gesture-handler";

import { PaperProvider } from "react-native-paper";

import MainNavigation from "./src/navigation/MainNavigation/MainNavigation";

export default function App() {
  return (
    <PaperProvider>
      <MainNavigation />
    </PaperProvider>
  );
}
