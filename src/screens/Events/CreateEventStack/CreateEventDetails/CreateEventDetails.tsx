import { ScrollView } from "react-native-gesture-handler";
import { Divider } from "react-native-paper";

import EventCapacity from "./EventCapacity/EventCapacity";
import EventDate from "./EventDate/EventDate";
import EventDescription from "./EventDescription/EventDescription";
import EventFee from "./EventFee/EventFee";
import EventImage from "./EventImage/EventImage";
import EventLocation from "./EventLocation/EventLocation";
import EventName from "./EventName/EventName";

const CreateEventDetails = () => {
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      style={{ padding: 30 }}
    >
      <EventName />
      <Divider style={{ marginVertical: 20 }} />
      <EventDate />
      <Divider style={{ marginVertical: 20 }} />
      <EventLocation />
      <Divider style={{ marginVertical: 20 }} />
      <EventCapacity />
      <Divider style={{ marginVertical: 20 }} />
      <EventFee />
      <Divider style={{ marginVertical: 20 }} />
      <EventImage />
      <Divider style={{ marginVertical: 20 }} />
      <EventDescription />
      <Divider style={{ marginVertical: 20 }} />
    </ScrollView>
  );
};

export default CreateEventDetails;
