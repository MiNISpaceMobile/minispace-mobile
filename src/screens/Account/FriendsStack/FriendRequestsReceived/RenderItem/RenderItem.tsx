import axios, { AxiosError } from "axios";
import * as SecureStore from "expo-secure-store";
import moment from "moment";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { Button, Portal, Snackbar, Text } from "react-native-paper";

import ProfilePicture from "../../../../../components/ProfilePicture/ProfilePicture";
import IFriendRequest from "../../../../../interfaces/FriendRequest";
import { useFriendRequestsReceivedStore } from "../../../../../zustand/friend-requests-received";

interface RenderItemProps {
  route: any;
  navigation: any;
  item: IFriendRequest;
}

const RenderItem = ({ route, navigation, item }: RenderItemProps) => {
  const [dialogVisible, setDialogVisible] = useState(false);

  const refresh = useFriendRequestsReceivedStore((state) => state.refresh);
  const fetchNextPage = useFriendRequestsReceivedStore(
    (state) => state.fetchFriendRequestsReceived,
  );

  const hideDialog = () => {
    setDialogVisible(false);
  };

  useEffect(() => {
    if (dialogVisible) {
      setTimeout(hideDialog, 5000);
    }
  }, [dialogVisible]);

  const respondFriendRequest = async (accept: boolean) => {
    const jwt = await SecureStore.getItemAsync("jwt");

    if (!jwt) {
      return new AxiosError("couldn't resolve jwt token");
    }

    await axios({
      url: "/api/friend-requests",
      method: "patch",
      baseURL: process.env.EXPO_PUBLIC_API_URL_MOCK,
      params: { target: item.id, accept },
      headers: { Authorization: "Bearer " + jwt },
    })
      .then((response) => {
        refresh();
        fetchNextPage();
      })
      .catch((error: AxiosError) => {
        setDialogVisible(true);
        return error;
      })
      .finally(() => {});
  };

  return (
    <View
      style={{
        paddingVertical: 10,
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "center",
      }}
    >
      <ProfilePicture
        userProfilePicture={item.user.profilePicture}
        userFirstName={item.user.firstName}
        userLastName={item.user.lastName}
        size={100}
      />
      <View>
        <View
          style={{
            flexDirection: "row",
            alignContent: "center",
          }}
        >
          <View>
            <Text variant="titleLarge" style={{ marginLeft: 20 }}>
              {item.user.firstName} {item.user.lastName}
            </Text>
            <Text variant="titleSmall" style={{ marginLeft: 20 }}>
              15 wspólnych znajomych
            </Text>
          </View>
          <View>
            <Text
              variant="titleSmall"
              style={{ marginLeft: 40, color: "gray" }}
            >
              {moment(item.timestamp).fromNow(true)}
            </Text>
          </View>
        </View>
        <View
          style={{ flexDirection: "row", alignItems: "center", padding: 10 }}
        >
          <View style={{ paddingHorizontal: 5 }}>
            <Button
              mode="contained-tonal"
              onPress={() => respondFriendRequest(true)}
            >
              Zaakceptuj
            </Button>
          </View>
          <View style={{ paddingHorizontal: 5 }}>
            <Button
              mode="contained-tonal"
              onPress={() => respondFriendRequest(false)}
            >
              Zignoruj
            </Button>
          </View>
        </View>
      </View>
      <Portal>
        <Snackbar
          wrapperStyle={{ marginBottom: 10 }}
          visible={dialogVisible}
          onDismiss={hideDialog}
          action={{
            label: "Zamknij",
            onPress: hideDialog,
          }}
        >
          Wystąpił problem z połączeniem.
        </Snackbar>
      </Portal>
    </View>
  );
};

export default RenderItem;
