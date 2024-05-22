import { View } from "react-native";

import ChangeScreenButtonsItem from "./ChangeScreenButtonsItem/ChangeScreenButtonsItem";

interface ChangeScreenButtonsProps {
  navigation: any;
}

const ChangeScreenButtons = ({ navigation }: ChangeScreenButtonsProps) => {
  return (
    <View style={{ marginHorizontal: 50, flex: 1 }}>
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
