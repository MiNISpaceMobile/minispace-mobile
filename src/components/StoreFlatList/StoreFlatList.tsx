import { AxiosError } from "axios";
import { useEffect } from "react";

import EmptyListStatus from "./EmptyListStatus/EmptyListStatus";
import ErrorStatus from "./ErrorStatus/ErrorStatus";
import LoadingStatus from "./LoadingStatus/LoadingStatus";
import RenderedFlatList from "./RenderedFlatList/RenderedFlatList";

export type PossibleFlatListType = any;

interface StoreFlatListProps {
  route: any;
  navigation: any;
  refresh: () => void;
  fetchNextPage: () => void;
  loading: boolean;
  error: AxiosError | null;
  list: PossibleFlatListType[];
  isLastPage: boolean;
  page: number;
  errorLabel: string;
  emptyListLabel: string;
  RenderItem: React.FC<{
    route: any;
    navigation: any;
    item: PossibleFlatListType;
  }>;
}

const StoreFlatList = ({
  route,
  navigation,
  refresh,
  fetchNextPage,
  loading,
  error,
  list,
  isLastPage,
  page,
  errorLabel,
  emptyListLabel,
  RenderItem,
}: StoreFlatListProps) => {
  const onRefresh = () => {
    refresh();
    fetchNextPage();
  };

  useEffect(() => {
    fetchNextPage();
  }, []);

  if (loading && page === 0) {
    return <LoadingStatus loading={loading} />;
  } else if (error) {
    return (
      <ErrorStatus
        refreshing={loading}
        onRefresh={onRefresh}
        label={errorLabel}
      />
    );
  } else if (list.length === 0) {
    return (
      <EmptyListStatus
        refreshing={loading}
        onRefresh={onRefresh}
        label={emptyListLabel}
      />
    );
  } else {
    return (
      <RenderedFlatList
        route={route}
        navigation={navigation}
        list={list}
        refreshing={loading}
        onRefresh={onRefresh}
        fetchNextPage={fetchNextPage}
        isLastPage={isLastPage}
        loading={loading}
        RenderItem={RenderItem}
      />
    );
  }
};

export default StoreFlatList;
