import { useEffect } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

import Header from "../../../components/Header/Header";
import { useNavigationStore } from "../../../zustand/navigation";

interface FriendsStackProps {
  navigation: any;
}

const FriendsStack = ({ navigation }: FriendsStackProps) => {
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
    <View>
      <Header
        title="Znajomi"
        iconVariant="left"
        leftIcon="arrow-left"
        navigation={navigation}
        goBack
      />
      <Text>FriendsStack</Text>
    </View>
  );
};

export default FriendsStack;
