import { PaperProvider } from "react-native-paper";

import MainNavigation from "./src/navigation/MainNavigation/MainNavigation";

export default function App() {
  return (
    <PaperProvider>
      <MainNavigation />
    </PaperProvider>
  );
}
