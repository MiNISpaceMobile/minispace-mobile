import { View } from "react-native";

import AccountDetails from "./AccountDetails/AccountDetails";
import ChangeScreenButtons from "./ChangeScreenButtons/ChangeScreenButtons";
import Header from "../../../components/Header/Header";

interface ProfileStackProps {
  navigation: any;
}

const ProfileStack = ({ navigation }: ProfileStackProps) => {
  return (
    <View style={{ minHeight: "100%" }}>
      <Header title="Profil" />
      <AccountDetails />
      <ChangeScreenButtons navigation={navigation} />
    </View>
  );
};

export default ProfileStack;
