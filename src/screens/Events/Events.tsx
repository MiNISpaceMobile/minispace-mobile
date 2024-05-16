import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";

import EventListStack from "./EventListStack/EventListStack";
import FilterStack from "./FilterStack/FilterStack";

const Stack = createStackNavigator();

const Events = () => {
  return (
    <Stack.Navigator
      initialRouteName="EventList"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="EventList"
        children={(props) => (
          <SafeAreaView testID="event-list">
            <EventListStack {...props} />
          </SafeAreaView>
        )}
      />
      <Stack.Screen
        name="Filter"
        children={(props) => (
          <SafeAreaView>
            <FilterStack {...props} />
          </SafeAreaView>
        )}
      />
    </Stack.Navigator>
  );
};

export default Events;
