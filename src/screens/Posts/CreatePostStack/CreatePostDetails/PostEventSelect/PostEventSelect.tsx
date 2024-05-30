import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native-paper";
import { PaperSelect } from "react-native-paper-select";

import IOrganizedEvent from "../../../../../interfaces/OrganizedEvent";
import { useCreatePostStore } from "../../../../../zustand/create-post";
import { useOrganizedEventsStore } from "../../../../../zustand/organized-events";

const PostEventSelect = () => {
  const fetchEvents = useOrganizedEventsStore((state) => state.fetchEvents);
  const events = useOrganizedEventsStore((state) => state.events);
  const loading = useOrganizedEventsStore((state) => state.loading);

  const postCreator = useCreatePostStore((state) => state.postCreator);
  const updatePostCreator = useCreatePostStore(
    (state) => state.updatePostCreator,
  );

  const [selectedEvent, setSelectedEvent] = useState<IOrganizedEvent>(
    events.length > 0 ? events[0] : { _id: "", value: "" },
  );

  useEffect(() => {
    updatePostCreator({ ...postCreator, eventId: selectedEvent._id });
  }, [selectedEvent]);

  useEffect(() => {
    if (events.length > 0) {
      setSelectedEvent(events[0]);
      updatePostCreator({ ...postCreator, eventId: events[0]._id });
    }
  }, [loading]);

  useEffect(() => {
    fetchEvents();
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <PaperSelect
      label="Wybierz wydarzenie"
      value={selectedEvent.value}
      onSelection={(event) => {
        if (event.selectedList.length > 0) {
          setSelectedEvent(event.selectedList[0]);
        }
      }}
      arrayList={[...events]}
      selectedArrayList={[selectedEvent]}
      multiEnable={false}
    />
  );
};

export default PostEventSelect;
