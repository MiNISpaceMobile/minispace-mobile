import { useState } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

import EventDetailsContentDetails from "./EventDetailsContentDetails/EventDetailsContentDetails";
import EventDetailsContentTabLabel from "./EventDetailsContentTabLabel/EventDetailsContentTabLabel";

type TabLabel = "details" | "comments" | "posts";

const EventDetailsContent = () => {
  const [tabLabel, setTabLabel] = useState<TabLabel>("details");

  return (
    <View>
      <View style={{ flexDirection: "row", marginTop: 10, marginBottom: 20 }}>
        <EventDetailsContentTabLabel
          label="Szczegóły"
          selected={tabLabel === "details"}
          onPress={() => {
            setTabLabel("details");
          }}
        />
        <EventDetailsContentTabLabel
          label="Komentarze"
          selected={tabLabel === "comments"}
          onPress={() => {
            setTabLabel("comments");
          }}
        />
        <EventDetailsContentTabLabel
          label="Posty"
          selected={tabLabel === "posts"}
          onPress={() => {
            setTabLabel("posts");
          }}
        />
      </View>
      {tabLabel === "details" && <EventDetailsContentDetails />}
    </View>
  );
};

export default EventDetailsContent;
