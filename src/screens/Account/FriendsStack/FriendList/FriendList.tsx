import RenderItem from "./RenderItem/RenderItem";
import StoreFlatList from "../../../../components/StoreFlatList/StoreFlatList";
import { useFriendsStore } from "../../../../zustand/friends";

interface FriendListProps {
  route: any;
  navigation: any;
}

const FriendList = ({ route, navigation }: FriendListProps) => {
  const friends = useFriendsStore((state) => state.friends);
  const refresh = useFriendsStore((state) => state.refresh);
  const fetchNextPage = useFriendsStore((state) => state.fetchFriends);
  const loading = useFriendsStore((state) => state.loading);
  const error = useFriendsStore((state) => state.error);
  const isLastPage = useFriendsStore((state) => state.isLastPage);
  const page = useFriendsStore((state) => state.page);

  return (
    <StoreFlatList
      route={route}
      navigation={navigation}
      refresh={refresh}
      fetchNextPage={fetchNextPage}
      loading={loading}
      error={error}
      list={friends}
      isLastPage={isLastPage}
      page={page}
      errorLabel="Problem z wczytaniem danych."
      emptyListLabel="Nie znaleziono żadnych przyjaciół."
      RenderItem={RenderItem}
    />
  );
};

export default FriendList;
