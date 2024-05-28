import { View } from "react-native";
import { HelperText, TextInput } from "react-native-paper";

import { useCreateEventStore } from "../../../../../zustand/create-event";

const EventLocation = () => {
  const eventCreator = useCreateEventStore((state) => state.eventCreator);
  const updateEventCreator = useCreateEventStore(
    (state) => state.updateEventCreator,
  );

  const hasErrors = () => {
    return eventCreator.location.length === 0;
  };

  return (
    <View>
      <TextInput
        label="Lokalizacja"
        value={eventCreator.location}
        onChangeText={(location) =>
          updateEventCreator({ ...eventCreator, location })
        }
      />
      <HelperText visible={hasErrors()} type="error">
        Lokalizacja nie może być pusta!
      </HelperText>
    </View>
  );
};

export default EventLocation;
