import { View } from "react-native";
import { Button } from "react-native-paper";

import { usePostFiltersStore } from "../../../../zustand/post-filters";

interface SearchProps {
  route: any;
  navigation: any;
}

const Search = ({ route, navigation }: SearchProps) => {
  const resetFilters = usePostFiltersStore((state) => state.resetFilters);

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
          onPress={() => navigation.navigate("PostList")}
        >
          Szukaj
        </Button>
      </View>
    </View>
  );
};

export default Search;
