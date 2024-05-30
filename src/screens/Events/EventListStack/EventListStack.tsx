import { View } from "react-native";
import { FAB } from "react-native-paper";

import EventList from "./EventList/EventList";
import Header from "../../../components/Header/Header";
import { useEventsStore } from "../../../zustand/events";

interface EventListStackProps {
  route: any;
  navigation: any;
}

const EventListStack = ({ route, navigation }: EventListStackProps) => {
  const loading = useEventsStore((state) => state.loading);

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

      <View
        style={{
          position: "absolute",
          bottom: loading ? -570 : 140,
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
    </View>
  );
};

export default EventListStack;
