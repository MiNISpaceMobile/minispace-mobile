import { useEffect, useState } from "react";
import { View } from "react-native";

import EventDetailsContentDetails from "./EventDetailsContentDetails/EventDetailsContentDetails";
import EventDetailsContentTabLabel from "./EventDetailsContentTabLabel/EventDetailsContentTabLabel";
import Comments from "../../../../components/Comments/Comments";
import { useEventCommentsStore } from "../../../../zustand/event-comments";
import { useEventDetailsStore } from "../../../../zustand/event-details";
import { useNavigationStore } from "../../../../zustand/navigation";
import { usePostFiltersStore } from "../../../../zustand/post-filters";
import { usePostsStore } from "../../../../zustand/posts";

type TabLabel = "details" | "comments";

interface EventDetailsContentProps {
  navigation: any;
  eventId: string;
  eventTitle: string;
}

const EventDetailsContent = ({
  navigation,
  eventId,
  eventTitle,
}: EventDetailsContentProps) => {
  const [tabLabel, setTabLabel] = useState<TabLabel>("details");

  const eventCommentsLoading = useEventCommentsStore((state) => state.loading);
  const eventCommentsError = useEventCommentsStore((state) => state.error);
  const comments = useEventCommentsStore((state) => state.comments);
  const fetchComments = useEventCommentsStore((state) => state.fetchComments);

  useEffect(() => {
    fetchComments(eventId);
  }, []);

  const eventDetailsLoading = useEventDetailsStore((state) => state.loading);
  const filters = usePostFiltersStore((state) => state.filters);
  const setFilters = usePostFiltersStore((state) => state.setFilters);

  const setDisplay = useNavigationStore((state) => state.setDisplay);

  const refresh = usePostsStore((state) => state.refresh);
  const fetchPosts = usePostsStore((state) => state.fetchPosts);

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
          selected={false}
          onPress={() => {
            if (!eventDetailsLoading) {
              setDisplay("flex");
              refresh();
              fetchPosts({ ...filters, eventId, eventTitle });
              setFilters({ ...filters, eventId, eventTitle });
              navigation.goBack();
              navigation.navigate("PostList");
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
