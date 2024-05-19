import { useState } from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";

import ReportDialog from "../../../../components/ReportDialog/ReportDialog";
import { useEventDetailsStore } from "../../../../zustand/event-details";

// TODO: implement action buttons
const EventDetailsActions = () => {
  const [reportDialogVisible, setReportDialogVisible] = useState(false);

  const loading = useEventDetailsStore((state) => state.loading);
  const eventDetails = useEventDetailsStore((state) => state.eventDetails);

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
        disabled={loading}
      >
        Zgłoś
      </Button>
      <Button
        icon="book-cancel"
        mode="contained"
        style={{ margin: 10 }}
        onPress={() => {}}
        disabled={loading || eventDetails === null || !eventDetails.subscribed}
      >
        Opuść
      </Button>
      <Button
        icon="book"
        mode="contained"
        style={{ margin: 10 }}
        onPress={() => {}}
        disabled={loading || eventDetails === null || eventDetails.subscribed}
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
