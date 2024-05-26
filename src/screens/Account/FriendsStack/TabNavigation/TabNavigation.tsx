import { View } from "react-native";

import TabNavigationItem from "./TabNavigationItem/TabNavigationItem";
import { Tab } from "../FriendsStack";

interface TabNavigationProps {
  tab: Tab;
  setTabHandler: (newTab: Tab) => void;
}

const TabNavigation = ({ tab, setTabHandler }: TabNavigationProps) => {
  return (
    <View style={{ flexDirection: "row", marginVertical: 15 }}>
      <TabNavigationItem
        label="Znajomi"
        target="friendsList"
        setTabHandler={setTabHandler}
        tab={tab}
      />
      <TabNavigationItem
        label="Otrzymane"
        target="requestsReceived"
        setTabHandler={setTabHandler}
        tab={tab}
      />
      <TabNavigationItem
        label="Wysłane"
        target="requestsSent"
        setTabHandler={setTabHandler}
        tab={tab}
      />
    </View>
  );
};

export default TabNavigation;
