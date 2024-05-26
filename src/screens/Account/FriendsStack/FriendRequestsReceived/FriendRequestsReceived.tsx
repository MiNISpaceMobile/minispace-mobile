import RenderItem from "./RenderItem/RenderItem";
import StoreFlatList from "../../../../components/StoreFlatList/StoreFlatList";
import { useFriendRequestsReceivedStore } from "../../../../zustand/friend-requests-received";

interface FriendRequestsReceivedProps {
  route: any;
  navigation: any;
}

const FriendRequestsReceived = ({
  route,
  navigation,
}: FriendRequestsReceivedProps) => {
  const friendRequestsReceived = useFriendRequestsReceivedStore(
    (state) => state.friendRequestsReceived,
  );
  const refresh = useFriendRequestsReceivedStore((state) => state.refresh);
  const fetchNextPage = useFriendRequestsReceivedStore(
    (state) => state.fetchFriendRequestsReceived,
  );
  const loading = useFriendRequestsReceivedStore((state) => state.loading);
  const error = useFriendRequestsReceivedStore((state) => state.error);
  const isLastPage = useFriendRequestsReceivedStore(
    (state) => state.isLastPage,
  );
  const page = useFriendRequestsReceivedStore((state) => state.page);

  return (
    <StoreFlatList
      route={route}
      navigation={navigation}
      refresh={refresh}
      fetchNextPage={fetchNextPage}
      loading={loading}
      error={error}
      list={friendRequestsReceived}
      isLastPage={isLastPage}
      page={page}
      errorLabel="Problem z wczytaniem danych."
      emptyListLabel="Nie znaleziono żadnego zaproszenia."
      RenderItem={RenderItem}
    />
  );
};

export default FriendRequestsReceived;
