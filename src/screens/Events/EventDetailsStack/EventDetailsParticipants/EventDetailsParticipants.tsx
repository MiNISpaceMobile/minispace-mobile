import { useEffect, useState } from "react";
import { View } from "react-native";
import { Chip } from "react-native-paper";

import EventDetailsParticipantsFriendsList from "./EventDetailsParticipantsFriendsList/EventDetailsParticipantsFriendsList";
import Skeleton from "../../../../components/Skeleton/Skeleton";
import User from "../../../../interfaces/User";
import { useEventDetailsStore } from "../../../../zustand/event-details";

const EventDetailsParticipants = () => {
  const [participants, setParticipants] = useState<number>(0);
  const [friends, setFriends] = useState<User[]>([]);
  const [friendsDialogVisible, setFriendsDialogVisible] = useState(false);

  const eventDetails = useEventDetailsStore((state) => state.eventDetails);
  const loading = useEventDetailsStore((state) => state.loading);

  const hideFriendsDialog = () => {
    setFriendsDialogVisible(false);
  };

  useEffect(() => {
    if (eventDetails !== null) {
      setParticipants(eventDetails.participants);
      setFriends(eventDetails.friends);
    }
  }, [eventDetails]);

  return (
    <View style={{ marginBottom: 10 }}>
      <Skeleton loading={loading} height={32}>
        <Chip icon="information" onPress={() => setFriendsDialogVisible(true)}>
          {participants} osób weźmie udział, w tym {friends.length} znajomych
        </Chip>
      </Skeleton>
      <EventDetailsParticipantsFriendsList
        friends={friends}
        friendsDialogVisible={friendsDialogVisible}
        hideFriendsDialog={hideFriendsDialog}
      />
    </View>
  );
};

export default EventDetailsParticipants;
