import { View } from "react-native";
import { HelperText, TextInput } from "react-native-paper";

import { useCreateEventStore } from "../../../../../zustand/create-event";

const EventCapacity = () => {
  const eventCreator = useCreateEventStore((state) => state.eventCreator);
  const updateEventCreator = useCreateEventStore(
    (state) => state.updateEventCreator,
  );

  const hasErrors = () => {
    return eventCreator.capacity === 0;
  };

  return (
    <View>
      <TextInput
        label="Liczba miejsc"
        value={eventCreator.capacity.toString()}
        onChangeText={(capacity) =>
          updateEventCreator({ ...eventCreator, capacity: Number(capacity) })
        }
        keyboardType="numeric"
      />
      <HelperText visible={hasErrors()} type="error">
        Wydarzenie musi mieć liczbę miejsc większą od zera!
      </HelperText>
    </View>
  );
};

export default EventCapacity;
