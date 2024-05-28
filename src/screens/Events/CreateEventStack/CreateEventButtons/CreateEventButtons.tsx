import { useEffect, useState } from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";

import { useCreateEventStore } from "../../../../zustand/create-event";

interface CreateEventButtonsProps {
  navigation: any;
}

const CreateEventButtons = ({ navigation }: CreateEventButtonsProps) => {
  const [canCreateEvent, setCanCreateEvent] = useState(false);

  const createEvent = useCreateEventStore((state) => state.createEvent);
  const eventCreator = useCreateEventStore((state) => state.eventCreator);
  const clear = useCreateEventStore((state) => state.clear);
  const hasErrors = useCreateEventStore((state) => state.hasErrors);

  useEffect(() => {
    setCanCreateEvent(!hasErrors());
  }, [eventCreator]);

  return (
    <View
      style={{
        paddingVertical: 10,
        flexDirection: "row",
        paddingHorizontal: 30,
      }}
    >
      <Button
        style={{ flex: 1, marginHorizontal: 10 }}
        mode="outlined"
        onPress={clear}
      >
        Wyczyść
      </Button>
      <Button
        style={{ flex: 1, marginHorizontal: 10 }}
        mode="outlined"
        onPress={async () => {
          await createEvent();
          clear();
          navigation.goBack();
        }}
        disabled={canCreateEvent === false}
      >
        Stwórz
      </Button>
    </View>
  );
};

export default CreateEventButtons;
