import { useEffect } from "react";
import { View } from "react-native";

import CreateEventButtons from "./CreateEventButtons/CreateEventButtons";
import CreateEventDetails from "./CreateEventDetails/CreateEventDetails";
import Header from "../../../components/Header/Header";
import { useNavigationStore } from "../../../zustand/navigation";

interface CreateEventStackProps {
  route: any;
  navigation: any;
}

const CreateEventStack = ({ route, navigation }: CreateEventStackProps) => {
  const setDisplay = useNavigationStore((state) => state.setDisplay);

  useEffect(() => {
    setDisplay("none");

    // https://stackoverflow.com/a/64789273
    const unsubscribe = navigation.addListener("beforeRemove", (e: any) => {
      e.preventDefault();
      unsubscribe();
      setDisplay("flex");
      navigation.goBack();
    });
  }, [navigation]);

  return (
    <View style={{ height: "100%" }}>
      <Header
        navigation={navigation}
        title="Nowe wydarzenie"
        iconVariant="left"
        leftIcon="arrow-left"
        goBack
      />
      <CreateEventDetails />
      <CreateEventButtons navigation={navigation} />
    </View>
  );
};

export default CreateEventStack;
