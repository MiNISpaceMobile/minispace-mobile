import { useEffect } from "react";
import { View } from "react-native";

import BuildInfo from "./BuildInfo/BuildInfo";
import SettingsStackContent from "./SettingsStackContent/SettingsStackContent";
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
    <View
      style={{
        flexDirection: "column",
        minHeight: "100%",
      }}
    >
      <Header
        title="Ustawienia"
        iconVariant="left"
        leftIcon="arrow-left"
        navigation={navigation}
        goBack
      />
      <SettingsStackContent />
      <BuildInfo />
    </View>
  );
};

export default SettingsStack;
