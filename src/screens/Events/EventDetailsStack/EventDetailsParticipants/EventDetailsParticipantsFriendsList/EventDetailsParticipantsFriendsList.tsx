import { FlatList, View } from "react-native";
import { Button, Dialog, List, Portal } from "react-native-paper";

import ProfilePicture from "../../../../../components/ProfilePicture/ProfilePicture";
import User from "../../../../../interfaces/User";

interface EventDetailsParticipantsFriendsListProps {
  friends: User[];
  friendsDialogVisible: boolean;
  hideFriendsDialog: () => void;
}

const EventDetailsParticipantsFriendsList = ({
  friends,
  friendsDialogVisible,
  hideFriendsDialog,
}: EventDetailsParticipantsFriendsListProps) => {
  return (
    <View>
      <Portal>
        <Dialog visible={friendsDialogVisible} onDismiss={hideFriendsDialog}>
          <Dialog.Title>Znajomi biorący udział</Dialog.Title>
          <Dialog.ScrollArea style={{ height: 400 }}>
            <FlatList
              data={friends}
              renderItem={({ item }) => (
                <List.Item
                  title={`${item.firstName} ${item.lastName}`}
                  left={() => (
                    <ProfilePicture
                      size={32}
                      userFirstName={item.firstName}
                      userLastName={item.lastName}
                    />
                  )}
                />
              )}
              keyExtractor={(friend) => friend.id}
            />
          </Dialog.ScrollArea>
          <Dialog.Actions>
            <Button onPress={hideFriendsDialog}>Zamknij</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default EventDetailsParticipantsFriendsList;
