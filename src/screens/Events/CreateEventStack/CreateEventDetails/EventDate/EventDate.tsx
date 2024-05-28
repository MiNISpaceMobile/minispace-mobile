import { View } from "react-native";
import { Divider } from "react-native-paper";

import EventDateTimePicker from "./EventDateTimePicker/EventDateTimePicker";
import { useCreateEventStore } from "../../../../../zustand/create-event";

const EventDate = () => {
  const eventCreator = useCreateEventStore((state) => state.eventCreator);
  const updateEventCreator = useCreateEventStore(
    (state) => state.updateEventCreator,
  );

  return (
    <View>
      <EventDateTimePicker
        date={eventCreator.startDate}
        setDateHandler={(date: Date) =>
          updateEventCreator({
            ...eventCreator,
            startDate: date,
            endDate: eventCreator.endDate > date ? eventCreator.endDate : date,
          })
        }
        buttonLabel="Ustaw początek wydarzenia"
        textLabel="Początek wydarzenia: "
        minimumDate={new Date()}
      />
      <Divider style={{ marginVertical: 20 }} />
      <EventDateTimePicker
        date={eventCreator.endDate}
        setDateHandler={(date: Date) =>
          updateEventCreator({ ...eventCreator, endDate: date })
        }
        buttonLabel="Ustaw koniec wydarzenia"
        textLabel="Koniec wydarzenia: "
        minimumDate={eventCreator.startDate}
      />
    </View>
  );
};

export default EventDate;
