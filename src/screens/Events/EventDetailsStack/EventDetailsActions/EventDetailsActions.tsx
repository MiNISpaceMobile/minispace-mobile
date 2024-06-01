import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { useState } from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";

import ReportDialog from "../../../../components/ReportDialog/ReportDialog";
import { useEventDetailsStore } from "../../../../zustand/event-details";
import { useUserStore } from "../../../../zustand/user";

const EventDetailsActions = () => {
  const [reportDialogVisible, setReportDialogVisible] = useState(false);

  const user = useUserStore((state) => state.user);

  const loading = useEventDetailsStore((state) => state.loading);
  const eventDetails = useEventDetailsStore((state) => state.eventDetails);
  const fetchEventDetails = useEventDetailsStore(
    (state) => state.fetchEventDetails,
  );

  const joinEvent = async () => {
    const jwt = await SecureStore.getItemAsync("jwt");

    if (!jwt) {
      return;
    }

    await axios({
      url: `/events/${eventDetails?.id}/participants`,
      method: "post",
      baseURL: process.env.EXPO_PUBLIC_API_URL,
      headers: { Authorization: "Bearer " + jwt },
    })
      .then(() => {
        fetchEventDetails(eventDetails!.id);
      })
      .catch(() => {})
      .finally(() => {});
  };

  const leaveEvent = async () => {
    const jwt = await SecureStore.getItemAsync("jwt");

    if (!jwt) {
      return;
    }

    await axios({
      url: `/events/${eventDetails?.id}/participants`,
      method: "delete",
      baseURL: process.env.EXPO_PUBLIC_API_URL,
      headers: { Authorization: "Bearer " + jwt },
    })
      .then(() => {
        fetchEventDetails(eventDetails!.id);
      })
      .catch(() => {})
      .finally(() => {});
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
      }}
    >
      <Button
        icon="flag-variant"
        mode="contained"
        style={{ margin: 10 }}
        onPress={() => setReportDialogVisible(true)}
        disabled={loading || user === null}
      >
        Zgłoś
      </Button>
      <Button
        icon="book-cancel"
        mode="contained"
        style={{ margin: 10 }}
        onPress={leaveEvent}
        disabled={
          loading ||
          eventDetails === null ||
          !eventDetails.subscribed ||
          user === null
        }
      >
        Opuść
      </Button>
      <Button
        icon="book"
        mode="contained"
        style={{ margin: 10 }}
        onPress={joinEvent}
        disabled={
          loading ||
          eventDetails === null ||
          eventDetails.subscribed ||
          user === null
        }
      >
        Dołącz
      </Button>
      <ReportDialog
        dialogVisible={reportDialogVisible}
        hideDialog={() => setReportDialogVisible(false)}
        label="Napisz w jaki sposób wydarzenie, które przeglądasz sprzeczny jest z regulaminem aplikacji:"
        // TODO: send report request
        postReport={() => {}}
      />
    </View>
  );
};

export default EventDetailsActions;
