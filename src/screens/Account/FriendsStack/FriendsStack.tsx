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
  route: any;
  navigation: any;
}

const FriendsStack = ({ route, navigation }: FriendsStackProps) => {
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
      {tab === "requestsReceived" && (
        <FriendRequestsReceived route={route} navigation={navigation} />
      )}
      {tab === "requestsSent" && (
        <FriendRequestsSent route={route} navigation={navigation} />
      )}
    </View>
  );
};

export default FriendsStack;
