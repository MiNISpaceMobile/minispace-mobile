import { View } from "react-native";

import EventList from "./EventList/EventList";
import Header from "./Header/Header";

interface EventListStackProps {
  route: any;
  navigation: any;
}

const EventListStack = ({ route, navigation }: EventListStackProps) => {
  return (
    <View>
      <Header route={route} navigation={navigation} />
      <EventList route={route} navigation={navigation} />
    </View>
  );
};

export default EventListStack;
