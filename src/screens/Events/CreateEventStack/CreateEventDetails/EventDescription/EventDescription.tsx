import { TextInput } from "react-native-paper";

import { useCreateEventStore } from "../../../../../zustand/create-event";

const EventDescription = () => {
  const eventCreator = useCreateEventStore((state) => state.eventCreator);
  const updateEventCreator = useCreateEventStore(
    (state) => state.updateEventCreator,
  );

  return (
    <TextInput
      label="Opis"
      value={eventCreator.description}
      onChangeText={(description) =>
        updateEventCreator({ ...eventCreator, description })
      }
      numberOfLines={10}
      multiline
    />
  );
};

export default EventDescription;
