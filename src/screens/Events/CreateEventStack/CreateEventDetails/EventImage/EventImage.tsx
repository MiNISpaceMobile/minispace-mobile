import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";

import { useCreateEventStore } from "../../../../../zustand/create-event";

const EventImage = () => {
  const eventCreator = useCreateEventStore((state) => state.eventCreator);
  const updateEventCreator = useCreateEventStore(
    (state) => state.updateEventCreator,
  );

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (result.canceled) {
      return;
    }

    updateEventCreator({ ...eventCreator, picture: result.assets[0] });
  };

  return (
    <View>
      <Button mode="contained-tonal" onPress={pickImage}>
        Dodaj obrazek
      </Button>
      <View style={{ padding: 10, marginTop: 10, alignItems: "center" }}>
        <Text style={{ marginBottom: 5 }}>Pogląd:</Text>
        <Image
          source={{ uri: eventCreator.picture?.uri }}
          placeholder={{ blurhash: "LJDvf|15iz-O~UvgW.%gDP?Z-pNd" }}
          contentFit="cover"
          transition={1000}
          style={{ width: "100%", height: 200 }}
        />
      </View>
    </View>
  );
};

export default EventImage;
