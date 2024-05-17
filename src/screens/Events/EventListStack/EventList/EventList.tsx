import { useEffect } from "react";

import EmptyListStatus from "./EmptyListStatus/EmptyListStatus";
import ErrorStatus from "./ErrorStatus/ErrorStatus";
import LoadingStatus from "./LoadingStatus/LoadingStatus";
import RenderedFlatList from "./RenderedFlatList/RenderedFlatList";
import { useEventFiltersStore } from "../../../../zustand/event-filters";
import { useEventsStore } from "../../../../zustand/events";

interface EventListProps {
  route: any;
  navigation: any;
}

const EventList = ({ route, navigation }: EventListProps) => {
  const events = useEventsStore((state) => state.events);
  const error = useEventsStore((state) => state.error);
  const loading = useEventsStore((state) => state.loading);
  const page = useEventsStore((state) => state.page);
  const isLastPage = useEventsStore((state) => state.isLastPage);
  const refresh = useEventsStore((state) => state.refresh);
  const fetchEvents = useEventsStore((state) => state.fetchEvents);
  const filters = useEventFiltersStore((state) => state.filters);

  const onRefresh = () => {
    refresh();
    fetchEvents(filters);
  };

  useEffect(() => {
    fetchEvents(filters);
  }, []);

  if (loading && page === 0) {
    return <LoadingStatus loading={loading} />;
  } else if (error) {
    return <ErrorStatus refreshing={loading} onRefresh={onRefresh} />;
  } else if (events.length === 0) {
    return <EmptyListStatus refreshing={loading} onRefresh={onRefresh} />;
  } else {
    return (
      <RenderedFlatList
        route={route}
        navigation={navigation}
        events={events}
        refreshing={loading}
        onRefresh={onRefresh}
        fetchNextPage={fetchEvents}
        isLastPage={isLastPage}
        loading={loading}
      />
    );
  }
};

export default EventList;
