import { View } from "react-native";

import AccountDetails from "./AccountDetails/AccountDetails";
import Header from "../../../components/Header/Header";

interface ProfileStackProps {
  route: any;
  navigation: any;
}

const ProfileStack = ({ route, navigation }: ProfileStackProps) => {
  return (
    <View>
      <Header title="Profil" />
      <AccountDetails />
    </View>
  );
};

export default ProfileStack;
