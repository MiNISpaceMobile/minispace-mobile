import { useState } from "react";
import { BottomNavigation } from "react-native-paper";

import Account from "../../screens/Account/Account";
import Events from "../../screens/Events/Events";
import Posts from "../../screens/Posts/Posts";

const MainNavigation = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {
      key: "posts",
      title: "Posts",
      focusedIcon: "home",
      unfocusedIcon: "home-outline",
    },
    {
      key: "events",
      title: "Events",
      focusedIcon: "calendar-month",
      unfocusedIcon: "calendar-month-outline",
    },
    {
      key: "account",
      title: "Account",
      focusedIcon: "account-circle",
      unfocusedIcon: "account-circle-outline",
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    posts: Posts,
    events: Events,
    account: Account,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default MainNavigation;
