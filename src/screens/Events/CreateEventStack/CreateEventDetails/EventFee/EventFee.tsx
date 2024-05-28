import { TextInput } from "react-native-paper";

import { useCreateEventStore } from "../../../../../zustand/create-event";

const EventFee = () => {
  const eventCreator = useCreateEventStore((state) => state.eventCreator);
  const updateEventCreator = useCreateEventStore(
    (state) => state.updateEventCreator,
  );

  return (
    <TextInput
      label="Cena (PLN)"
      value={eventCreator.fee.toString()}
      onChangeText={(fee) =>
        updateEventCreator({ ...eventCreator, fee: Number(fee) })
      }
      keyboardType="numeric"
    />
  );
};

export default EventFee;
