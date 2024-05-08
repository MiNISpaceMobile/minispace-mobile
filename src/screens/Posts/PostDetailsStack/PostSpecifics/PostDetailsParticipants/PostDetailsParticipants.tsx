import { useEffect, useState } from "react";
import { View } from "react-native";
import { Chip } from "react-native-paper";

import PostDetailsParticipantsFriendsList from "./PostDetailsParticipantsList/PostDetailsParticipantsFriendsList";
import Skeleton from "../../../../../components/Skeleton/Skeleton";
import User from "../../../../../interfaces/User";
import { usePostDetailsStore } from "../../../../../zustand/post-details";

const PostDetailsParticipants = () => {
  const [participants, setParticipants] = useState<number>(0);
  const [friends, setFriends] = useState<User[]>([]);
  const [friendsDialogVisible, setFriendsDialogVisible] = useState(false);

  const postDetails = usePostDetailsStore((state) => state.postDetails);
  const loading = usePostDetailsStore((state) => state.loading);

  const hideFriendsDialog = () => {
    setFriendsDialogVisible(false);
  };

  useEffect(() => {
    if (postDetails !== null) {
      setParticipants(postDetails.participants);
      setFriends(postDetails.friends);
    }
  }, [postDetails]);

  return (
    <View style={{ marginBottom: 10 }}>
      <Skeleton loading={loading} height={32}>
        <Chip icon="information" onPress={() => setFriendsDialogVisible(true)}>
          {participants} osób weźmie udział, w tym {friends.length} znajomych
        </Chip>
      </Skeleton>
      <PostDetailsParticipantsFriendsList
        friends={friends}
        friendsDialogVisible={friendsDialogVisible}
        hideFriendsDialog={hideFriendsDialog}
      />
    </View>
  );
};

export default PostDetailsParticipants;
