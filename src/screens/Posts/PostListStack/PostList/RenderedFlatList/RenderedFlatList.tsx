import { ActivityIndicator, FlatList, RefreshControl } from "react-native";
import { useTheme } from "react-native-paper";

import Filter from "./Filter/Filter";
import RenderedFlatListItem from "./RenderedFlatListItem/RenderedFlatListItem";
import IPost from "../../../../../interfaces/Post";
import IPostFilters from "../../../../../interfaces/PostFilters";
import { usePostFiltersStore } from "../../../../../zustand/post-filters";

interface RenderedFlatListProps {
  route: any;
  navigation: any;
  posts: IPost[];
  refreshing: boolean;
  onRefresh: () => void;
  fetchNextPage: (filters: IPostFilters) => void;
  isLastPage: boolean;
  loading: boolean;
}

const RenderedFlatList = ({
  route,
  navigation,
  posts,
  refreshing,
  onRefresh,
  fetchNextPage,
  isLastPage,
  loading,
}: RenderedFlatListProps) => {
  const theme = useTheme();

  const filters = usePostFiltersStore((state) => state.filters);

  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => (
        <RenderedFlatListItem
          post={item}
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
      ListHeaderComponent={<Filter />}
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
