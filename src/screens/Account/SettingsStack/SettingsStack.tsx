import { useEffect } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

import Header from "../../../components/Header/Header";
import { useNavigationStore } from "../../../zustand/navigation";

interface SettingsStackProps {
  navigation: any;
}

const SettingsStack = ({ navigation }: SettingsStackProps) => {
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
        title="Ustawienia"
        iconVariant="left"
        leftIcon="arrow-left"
        navigation={navigation}
        goBack
      />
      <Text>SettingsStack</Text>
    </View>
  );
};

export default SettingsStack;
