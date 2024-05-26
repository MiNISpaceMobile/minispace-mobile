import { Text, TouchableRipple } from "react-native-paper";

import { Tab } from "../../FriendsStack";

interface TabNavigationItemProps {
  label: string;
  target: Tab;
  setTabHandler: (newTab: Tab) => void;
  tab: Tab;
}

const TabNavigationItem = ({
  label,
  target,
  setTabHandler,
  tab,
}: TabNavigationItemProps) => {
  return (
    <TouchableRipple
      onPress={() => setTabHandler(target)}
      style={{
        flex: 1,
        alignSelf: "center",
        padding: 10,
        borderRadius: 10,
        marginHorizontal: 10,
      }}
      disabled={tab === target}
      borderless
    >
      <Text
        variant="titleMedium"
        style={{
          textAlign: "center",
          color: tab === target ? "black" : "gray",
          fontWeight: tab === target ? "bold" : "normal",
        }}
      >
        {label}
      </Text>
    </TouchableRipple>
  );
};

export default TabNavigationItem;
