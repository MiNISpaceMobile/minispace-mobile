import { useEffect } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

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
    <View>
      <Text>Filter</Text>
    </View>
  );
};

export default FilterStack;
