import axios, { AxiosError } from "axios";
import * as ImagePicker from "expo-image-picker";
import * as SecureStore from "expo-secure-store";
import FormData from "form-data";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { Icon, Text, TouchableRipple } from "react-native-paper";

import ProfilePicture from "../../../../components/ProfilePicture/ProfilePicture";
import { useUserStore } from "../../../../zustand/user";

const AccountDetails = () => {
  const [firstName, setFirstName] = useState<string | null>(null);
  const [lastName, setLastName] = useState<string | null>(null);

  const user = useUserStore((state) => state.user);
  const fetchUser = useUserStore((state) => state.fetchUser);

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
    }
  }, [user]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (result.canceled) {
      return;
    }

    const image = result.assets[0];

    const mimeType = image.mimeType;
    const filename = image.fileName;
    const uri = image.uri;

    if (!mimeType || !filename || !uri) {
      return;
    }

    const jwt = await SecureStore.getItemAsync("jwt");

    if (!jwt) {
      return;
    }

    const formData = new FormData();
    formData.append("picture", {
      uri,
      type: mimeType,
      name: filename,
    });

    let error: AxiosError | null = null;

    await axios({
      url: "/users/user/picture",
      method: "post",
      baseURL: process.env.EXPO_PUBLIC_API_URL,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + jwt,
      },
    })
      .then((response) => {})
      .catch((_error: AxiosError) => {
        error = _error;
      })
      .finally(() => {});

    if (error) {
      return;
    }

    await fetchUser(jwt);
  };

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "center",
        flex: 1,
      }}
    >
      <>
        <View style={{ marginRight: 20 }}>
          <ProfilePicture size={100} />
          {user && (
            <TouchableRipple
              style={{
                position: "absolute",
                bottom: -5,
                right: -5,
                borderRadius: 12,
                backgroundColor: "white",
                elevation: 2,
                padding: 4,
              }}
              onPress={pickImage}
              disabled={user === null}
              borderless
            >
              <Icon source="pencil" size={28} />
            </TouchableRipple>
          )}
        </View>
      </>
      {user ? (
        <View style={{ flexDirection: "column" }}>
          <Text variant="displayMedium" style={{ fontWeight: "bold" }}>
            {firstName}
          </Text>
          <Text variant="displayMedium" style={{ fontWeight: "bold" }}>
            {lastName}
          </Text>
        </View>
      ) : (
        <View>
          <Text variant="displayMedium" style={{ fontWeight: "bold" }}>
            Gość
          </Text>
        </View>
      )}
    </View>
  );
};

export default AccountDetails;
