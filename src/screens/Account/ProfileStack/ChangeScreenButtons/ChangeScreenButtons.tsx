import { View } from "react-native";

import ChangeScreenButtonsItem from "./ChangeScreenButtonsItem/ChangeScreenButtonsItem";

interface ChangeScreenButtonsProps {
  navigation: any;
}

const ChangeScreenButtons = ({ navigation }: ChangeScreenButtonsProps) => {
  return (
    <View style={{ marginTop: 20, padding: 50 }}>
      <ChangeScreenButtonsItem
        navigation={navigation}
        routeName="EditProfile"
        label="Edytuj profil"
        icon="account-edit"
      />
      <ChangeScreenButtonsItem
        navigation={navigation}
        routeName="Friends"
        label="Znajomi"
        icon="account-group"
      />
      <ChangeScreenButtonsItem
        navigation={navigation}
        routeName="Settings"
        label="Ustawienia"
        icon="cog"
      />
    </View>
  );
};

export default ChangeScreenButtons;
