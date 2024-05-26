import RenderItem from "./RenderItem/RenderItem";
import StoreFlatList from "../../../../components/StoreFlatList/StoreFlatList";
import { useFriendRequestsSentStore } from "../../../../zustand/friend-requests-sent";

interface FriendRequestsSentProps {
  route: any;
  navigation: any;
}

const FriendRequestsSent = ({ route, navigation }: FriendRequestsSentProps) => {
  const friendRequestsSent = useFriendRequestsSentStore(
    (state) => state.friendRequestsSent,
  );
  const refresh = useFriendRequestsSentStore((state) => state.refresh);
  const fetchNextPage = useFriendRequestsSentStore(
    (state) => state.fetchFriendRequestsSent,
  );
  const loading = useFriendRequestsSentStore((state) => state.loading);
  const error = useFriendRequestsSentStore((state) => state.error);
  const isLastPage = useFriendRequestsSentStore((state) => state.isLastPage);
  const page = useFriendRequestsSentStore((state) => state.page);

  return (
    <StoreFlatList
      route={route}
      navigation={navigation}
      refresh={refresh}
      fetchNextPage={fetchNextPage}
      loading={loading}
      error={error}
      list={friendRequestsSent}
      isLastPage={isLastPage}
      page={page}
      errorLabel="Problem z wczytaniem danych."
      emptyListLabel="Nie znaleziono żadnego wysłanego zaproszenia."
      RenderItem={RenderItem}
    />
  );
};

export default FriendRequestsSent;
