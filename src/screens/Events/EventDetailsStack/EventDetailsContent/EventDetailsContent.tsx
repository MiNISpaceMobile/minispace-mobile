import { useEffect, useState } from "react";
import { View } from "react-native";

import EventDetailsContentDetails from "./EventDetailsContentDetails/EventDetailsContentDetails";
import EventDetailsContentTabLabel from "./EventDetailsContentTabLabel/EventDetailsContentTabLabel";
import Comments from "../../../../components/Comments/Comments";
import { useEventCommentsStore } from "../../../../zustand/event-comments";
import { useEventDetailsStore } from "../../../../zustand/event-details";

type TabLabel = "details" | "comments" | "posts";

interface EventDetailsContentProps {
  eventId: string;
}

const EventDetailsContent = ({ eventId }: EventDetailsContentProps) => {
  const [tabLabel, setTabLabel] = useState<TabLabel>("details");

  const eventCommentsLoading = useEventCommentsStore((state) => state.loading);
  const eventCommentsError = useEventCommentsStore((state) => state.error);
  const comments = useEventCommentsStore((state) => state.comments);
  const fetchComments = useEventCommentsStore((state) => state.fetchComments);

  useEffect(() => {
    fetchComments(eventId);
  }, []);

  const eventDetailsLoading = useEventDetailsStore((state) => state.loading);

  return (
    <View>
      <View style={{ flexDirection: "row", marginTop: 5, marginBottom: 15 }}>
        <EventDetailsContentTabLabel
          label="Szczegóły"
          selected={tabLabel === "details"}
          onPress={() => {
            if (!eventDetailsLoading) {
              setTabLabel("details");
            }
          }}
        />
        <EventDetailsContentTabLabel
          label="Komentarze"
          selected={tabLabel === "comments"}
          onPress={() => {
            if (!eventDetailsLoading) {
              setTabLabel("comments");
            }
          }}
        />
        <EventDetailsContentTabLabel
          label="Posty"
          selected={tabLabel === "posts"}
          onPress={() => {
            if (!eventDetailsLoading) {
              setTabLabel("posts");
            }
          }}
        />
      </View>
      {tabLabel === "details" && <EventDetailsContentDetails />}
      {tabLabel === "comments" && (
        <Comments
          comments={comments}
          error={eventCommentsError}
          loading={eventCommentsLoading}
        />
      )}
    </View>
  );
};

export default EventDetailsContent;
