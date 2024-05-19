import { View } from "react-native";

import EventList from "./EventList/EventList";
import Header from "../../../components/Header/Header";

interface EventListStackProps {
  route: any;
  navigation: any;
}

const EventListStack = ({ route, navigation }: EventListStackProps) => {
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
    </View>
  );
};

export default EventListStack;
