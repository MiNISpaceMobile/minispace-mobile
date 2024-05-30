import { useEffect } from "react";
import { View } from "react-native";

import CreatePostButtons from "./CreatePostButtons/CreatePostButtons";
import CreatePostDetails from "./CreatePostDetails/CreatePostDetails";
import Header from "../../../components/Header/Header";
import { useNavigationStore } from "../../../zustand/navigation";

interface CreatePostStackProps {
  route: any;
  navigation: any;
}

const CreatePostStack = ({ route, navigation }: CreatePostStackProps) => {
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
        title="Nowy post"
        iconVariant="left"
        leftIcon="arrow-left"
        goBack
      />
      <CreatePostDetails />
      <CreatePostButtons navigation={navigation} />
    </View>
  );
};

export default CreatePostStack;
