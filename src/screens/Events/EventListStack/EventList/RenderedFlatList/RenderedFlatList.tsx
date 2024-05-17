import { ActivityIndicator, FlatList, RefreshControl } from "react-native";
import { useTheme } from "react-native-paper";

import RenderedFlatListItem from "./RenderedFlatListItem/RenderedFlatListItem";
import IEvent from "../../../../../interfaces/Event";
import EventFilters from "../../../../../interfaces/EventFilters";
import IPost from "../../../../../interfaces/Post";
import { useEventFiltersStore } from "../../../../../zustand/event-filters";

interface RenderedFlatListProps {
  route: any;
  navigation: any;
  events: IEvent[];
  refreshing: boolean;
  onRefresh: () => void;
  fetchNextPage: (filters: EventFilters) => void;
  isLastPage: boolean;
  loading: boolean;
}

const RenderedFlatList = ({
  route,
  navigation,
  events,
  refreshing,
  onRefresh,
  fetchNextPage,
  isLastPage,
  loading,
}: RenderedFlatListProps) => {
  const theme = useTheme();

  const filters = useEventFiltersStore((state) => state.filters);

  return (
    <FlatList
      data={events}
      renderItem={({ item }) => (
        <RenderedFlatListItem
          event={item}
          route={route}
          navigation={navigation}
        />
      )}
      keyExtractor={(post: IPost) => post.id}
      contentContainerStyle={{
        flexGrow: 1,
        overflow: "visible",
        minHeight: "100%",
        paddingHorizontal: 30,
        paddingTop: 15,
        paddingBottom: 120,
      }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      onEndReached={() => {
        fetchNextPage(filters);
      }}
      onEndReachedThreshold={0.8}
      ListFooterComponent={
        !isLastPage ? (
          <ActivityIndicator
            animating={loading}
            size={48}
            color={theme.colors.secondary}
            style={{
              paddingBottom: 30,
            }}
          />
        ) : null
      }
    />
  );
};

export default RenderedFlatList;
