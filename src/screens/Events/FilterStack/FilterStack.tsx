import { useEffect } from "react";
import { View } from "react-native";

import FilterList from "./FilterList/FilterList";
import Search from "./Search/Search";
import Header from "../../../components/Header/Header";
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
      navigation.navigate("EventList");
    });
  }, [navigation]);

  return (
    <View style={{ flexDirection: "column", height: "100%" }}>
      <Header
        navigation={navigation}
        title="Filtry"
        navigateRouteName="EventList"
        iconVariant="left"
        leftIcon="arrow-left"
      />
      <FilterList />
      <Search route={route} navigation={navigation} />
    </View>
  );
};

export default FilterStack;
