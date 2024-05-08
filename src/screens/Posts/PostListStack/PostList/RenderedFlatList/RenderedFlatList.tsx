import { ActivityIndicator, FlatList, RefreshControl } from "react-native";
import { useTheme } from "react-native-paper";

import RenderedFlatListItem from "./RenderedFlatListItem/RenderedFlatListItem";
import Post from "../../../../../interfaces/Post";
import PostFilters from "../../../../../interfaces/PostFilters";
import { usePostFiltersStore } from "../../../../../zustand/post-filters";

interface RenderedFlatListProps {
  route: any;
  navigation: any;
  posts: Post[];
  refreshing: boolean;
  onRefresh: () => void;
  fetchNextPage: (filters: PostFilters) => void;
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
      keyExtractor={(post: Post) => post.id}
      contentContainerStyle={{
        flexGrow: 1,
        overflow: "visible",
        minHeight: "100%",
        padding: 30,
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
