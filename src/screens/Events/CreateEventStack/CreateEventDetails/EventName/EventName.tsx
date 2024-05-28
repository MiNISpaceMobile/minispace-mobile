import { View } from "react-native";
import { HelperText, TextInput } from "react-native-paper";

import { useCreateEventStore } from "../../../../../zustand/create-event";

const EventName = () => {
  const eventCreator = useCreateEventStore((state) => state.eventCreator);
  const updateEventCreator = useCreateEventStore(
    (state) => state.updateEventCreator,
  );

  const hasErrors = () => {
    return eventCreator.title.length === 0;
  };

  return (
    <View>
      <TextInput
        label="Nazwa wydarzenia"
        value={eventCreator.title}
        onChangeText={(title) => updateEventCreator({ ...eventCreator, title })}
      />
      <HelperText visible={hasErrors()} type="error">
        Nazwa wydarzenia nie może być pusta!
      </HelperText>
    </View>
  );
};

export default EventName;
