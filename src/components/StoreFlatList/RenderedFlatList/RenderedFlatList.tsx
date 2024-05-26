import { ActivityIndicator, FlatList, RefreshControl } from "react-native";
import { useTheme } from "react-native-paper";

import { PossibleFlatListType } from "../StoreFlatList";

interface RenderedFlatListProps {
  route: any;
  navigation: any;
  list: PossibleFlatListType[];
  refreshing: boolean;
  onRefresh: () => void;
  fetchNextPage: () => void;
  isLastPage: boolean;
  loading: boolean;
  RenderItem: React.FC<{
    route: any;
    navigation: any;
    item: PossibleFlatListType;
  }>;
}

const RenderedFlatList = ({
  route,
  navigation,
  list,
  refreshing,
  onRefresh,
  fetchNextPage,
  isLastPage,
  loading,
  RenderItem,
}: RenderedFlatListProps) => {
  const theme = useTheme();

  return (
    <FlatList
      data={list}
      renderItem={({ item }) => (
        <RenderItem route={route} navigation={navigation} item={item} />
      )}
      keyExtractor={(item: PossibleFlatListType) => item.id}
      contentContainerStyle={{
        flexGrow: 1,
        overflow: "visible",
        minHeight: "100%",
        paddingHorizontal: 30,
        paddingBottom: 300,
      }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      onEndReached={fetchNextPage}
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
