import { FlatList, View } from "react-native";
import { Avatar, Button, Dialog, List, Portal } from "react-native-paper";

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
                  title={item.username}
                  left={() => (
                    <Avatar.Text
                      size={32}
                      label={item.username.slice(0, 2).trim()}
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
