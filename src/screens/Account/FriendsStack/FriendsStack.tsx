import { useEffect, useState } from "react";
import { View } from "react-native";

import FriendList from "./FriendList/FriendList";
import FriendRequestsReceived from "./FriendRequestsReceived/FriendRequestsReceived";
import FriendRequestsSent from "./FriendRequestsSent/FriendRequestsSent";
import TabNavigation from "./TabNavigation/TabNavigation";
import Header from "../../../components/Header/Header";
import { useNavigationStore } from "../../../zustand/navigation";

export type Tab = "friendsList" | "requestsReceived" | "requestsSent";

interface FriendsStackProps {
  navigation: any;
}

const FriendsStack = ({ navigation }: FriendsStackProps) => {
  const [tab, setTab] = useState<Tab>("friendsList");

  const setDisplay = useNavigationStore((state) => state.setDisplay);

  const setTabHandler = (newTab: Tab) => {
    setTab(newTab);
  };

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
      <TabNavigation tab={tab} setTabHandler={setTabHandler} />
      {tab === "friendsList" && <FriendList />}
      {tab === "requestsReceived" && <FriendRequestsReceived />}
      {tab === "requestsSent" && <FriendRequestsSent />}
    </View>
  );
};

export default FriendsStack;
