import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { Button, Dialog, Portal, Text } from "react-native-paper";

import Header from "../../../components/Header/Header";
import { useEventDetailsStore } from "../../../zustand/event-details";
import { useNavigationStore } from "../../../zustand/navigation";

interface EventDetailsStackProps {
  route: any;
  navigation: any;
}

const EventDetailsStack = ({ route, navigation }: EventDetailsStackProps) => {
  const { eventId } = route.params as { eventId: string };

  const [errorDialogVisible, setErrorDialogVisible] = useState(false);

  const error = useEventDetailsStore((state) => state.error);
  const fetchEventDetails = useEventDetailsStore(
    (state) => state.fetchEventDetails,
  );

  const eventDetails = useEventDetailsStore((state) => state.eventDetails);
  const loading = useEventDetailsStore((state) => state.loading);

  useEffect(() => {
    fetchEventDetails(eventId);
  }, []);

  useEffect(() => {
    setErrorDialogVisible(error !== null);
  }, [error]);

  const setDisplay = useNavigationStore((state) => state.setDisplay);

  const [title, setTitle] = useState<null | string>(null);

  useEffect(() => {
    if (eventDetails !== null) {
      setTitle(eventDetails.eventTitle);
    }
  }, [eventDetails]);

  useEffect(() => {
    setDisplay("none");

    // https://stackoverflow.com/a/64789273
    const unsubscribe = navigation.addListener("beforeRemove", (e: any) => {
      e.preventDefault();
      unsubscribe();
      setDisplay("flex");
      navigation.navigate("EventList");
    });
  }, [navigation]);

  const goBack = () => {
    setErrorDialogVisible(false);
    navigation.navigate("EventList");
  };

  return (
    <ScrollView>
      <Portal>
        <Dialog visible={errorDialogVisible} dismissable={false}>
          <Dialog.Title>Błąd podczas ładowania</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">
              Podczas wczytywania nastąpił błąd. Wróć do listy wydarzeń i
              spróbuj ponownie. Jeżeli błąd nadal będzie występował skontaktuj
              się z administratorem.
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={goBack}>Wróć</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <View>
        <Header
          navigation={navigation}
          loading={loading}
          title={title}
          navigateRouteName="EventList"
          iconVariant="left"
          leftIcon="arrow-left"
        />
      </View>
    </ScrollView>
  );
};

export default EventDetailsStack;
