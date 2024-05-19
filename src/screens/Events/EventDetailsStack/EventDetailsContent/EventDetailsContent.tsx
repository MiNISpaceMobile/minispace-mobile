import { useState } from "react";
import { View } from "react-native";

import EventDetailsContentDetails from "./EventDetailsContentDetails/EventDetailsContentDetails";
import EventDetailsContentTabLabel from "./EventDetailsContentTabLabel/EventDetailsContentTabLabel";
import { useEventDetailsStore } from "../../../../zustand/event-details";

type TabLabel = "details" | "comments" | "posts";

const EventDetailsContent = () => {
  const [tabLabel, setTabLabel] = useState<TabLabel>("details");

  const loading = useEventDetailsStore((state) => state.loading);

  return (
    <View>
      <View style={{ flexDirection: "row", marginTop: 5, marginBottom: 15 }}>
        <EventDetailsContentTabLabel
          label="Szczegóły"
          selected={tabLabel === "details"}
          onPress={() => {
            if (!loading) {
              setTabLabel("details");
            }
          }}
        />
        <EventDetailsContentTabLabel
          label="Komentarze"
          selected={tabLabel === "comments"}
          onPress={() => {
            if (!loading) {
              setTabLabel("comments");
            }
          }}
        />
        <EventDetailsContentTabLabel
          label="Posty"
          selected={tabLabel === "posts"}
          onPress={() => {
            if (!loading) {
              setTabLabel("posts");
            }
          }}
        />
      </View>
      {tabLabel === "details" && <EventDetailsContentDetails />}
    </View>
  );
};

export default EventDetailsContent;
