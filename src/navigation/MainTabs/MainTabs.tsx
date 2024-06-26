import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CommonActions } from "@react-navigation/native";
import { BottomNavigation, Icon } from "react-native-paper";

import Account from "../../screens/Account/Account";
import Events from "../../screens/Events/Events";
import Posts from "../../screens/Posts/Posts";
import { useNavigationStore } from "../../zustand/navigation";
import { useUserStore } from "../../zustand/user";

const Tab = createBottomTabNavigator();

const MainTabs = () => {
  const user = useUserStore((state) => state.user);

  const display = useNavigationStore((state) => state.display);

  return (
    <Tab.Navigator
      initialRouteName={user ? "posts" : "events"}
      screenOptions={{
        headerShown: false,
      }}
      tabBar={({ navigation, state, descriptors, insets }) => (
        <BottomNavigation.Bar
          style={{ display }}
          navigationState={state}
          safeAreaInsets={insets}
          onTabPress={({ route, preventDefault }) => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (event.defaultPrevented) {
              preventDefault();
            } else {
              navigation.dispatch({
                ...CommonActions.navigate(route.name, route.params),
                target: state.key,
              });
            }
          }}
          renderIcon={({ route, focused, color }) => {
            const { options } = descriptors[route.key];
            if (options.tabBarIcon) {
              return options.tabBarIcon({ focused, color, size: 24 });
            }

            return null;
          }}
          getLabelText={({ route }) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                  ? options.title
                  : // @ts-ignore: code from documentation https://callstack.github.io/react-native-paper/docs/components/BottomNavigation/BottomNavigationBar#usage
                    route.title;

            return label;
          }}
        />
      )}
    >
      {user && (
        <Tab.Screen
          name="posts"
          component={Posts}
          options={{
            tabBarLabel: "Posty",
            tabBarIcon: ({ focused, color, size }) => {
              return (
                <Icon
                  source={"home" + (focused ? "" : "-outline")}
                  size={size}
                  color={color}
                />
              );
            },
          }}
        />
      )}
      <Tab.Screen
        name="events"
        component={Events}
        options={{
          tabBarLabel: "Wydarzenia",
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Icon
                source={"calendar-month" + (focused ? "" : "-outline")}
                size={size}
                color={color}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="profile"
        component={Account}
        options={{
          tabBarLabel: "Profil",
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Icon
                source={"account-circle" + (focused ? "" : "-outline")}
                size={size}
                color={color}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabs;
