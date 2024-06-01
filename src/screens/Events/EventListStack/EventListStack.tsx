import { View } from "react-native";
import { FAB } from "react-native-paper";

import EventList from "./EventList/EventList";
import Header from "../../../components/Header/Header";
import { useUserStore } from "../../../zustand/user";

interface EventListStackProps {
  route: any;
  navigation: any;
}

const EventListStack = ({ route, navigation }: EventListStackProps) => {
  const user = useUserStore((state) => state.user);

  return (
    <View>
      <Header
        navigation={navigation}
        loading={false}
        title="Wydarzenia"
        navigateRouteName="Filter"
        iconVariant="right"
        rightIcon="filter"
      />
      <EventList route={route} navigation={navigation} />

      {user?.isOrganizer && (
        <View
          style={{
            position: "absolute",
            minHeight: "100%",
            top: 680,
            minWidth: "100%",
            alignItems: "center",
          }}
        >
          <FAB
            icon="plus"
            label="Nowe wydarzenie"
            onPress={() => navigation.navigate("CreateEvent")}
          />
        </View>
      )}
    </View>
  );
};

export default EventListStack;
