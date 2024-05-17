import { View } from "react-native";
import { Button } from "react-native-paper";

import { useEventFiltersStore } from "../../../../zustand/event-filters";

interface SearchProps {
  route: any;
  navigation: any;
}

const Search = ({ route, navigation }: SearchProps) => {
  const resetFilters = useEventFiltersStore((state) => state.resetFilters);

  return (
    <View style={{ padding: 20, flexDirection: "row" }}>
      <View style={{ flex: 2 }}>
        <Button
          icon="close-circle"
          mode="contained-tonal"
          onPress={resetFilters}
        >
          Resetuj
        </Button>
      </View>
      <View style={{ flex: 1 }} />
      <View style={{ flex: 2 }}>
        <Button
          icon="magnify"
          mode="contained-tonal"
          onPress={() => navigation.navigate("EventList")}
        >
          Szukaj
        </Button>
      </View>
    </View>
  );
};

export default Search;
