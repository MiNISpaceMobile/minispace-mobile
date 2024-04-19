import { useEffect } from "react";
import { View } from "react-native";

import FilterList from "./FilterList/FilterList";
import Header from "./Header/Header";
import Search from "./Search/Search";
import { useNavigationStore } from "../../../zustand/navigation";

interface FilterStackProps {
  route: any;
  navigation: any;
}

const FilterStack = ({ route, navigation }: FilterStackProps) => {
  const setDisplay = useNavigationStore((state) => state.setDisplay);

  useEffect(() => {
    setDisplay("none");

    // https://stackoverflow.com/a/64789273
    const unsubscribe = navigation.addListener("beforeRemove", (e: any) => {
      e.preventDefault();
      unsubscribe();
      setDisplay("flex");
      navigation.navigate("PostList");
    });
  }, [navigation]);

  return (
    <View style={{ flexDirection: "column", height: "100%" }}>
      <Header />
      <FilterList />
      <Search route={route} navigation={navigation} />
    </View>
  );
};

export default FilterStack;
