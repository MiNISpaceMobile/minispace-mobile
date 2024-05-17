import { Image } from "expo-image";
import { Animated, Pressable, View } from "react-native";
import { Icon, Surface, Text, useTheme } from "react-native-paper";

import IEvent from "../../../../../../interfaces/Event";
import formatDateRange from "../../../../../../lib/formatDateRange";

interface RenderedFlatListItemProps {
  route: any;
  navigation: any;
  event: IEvent;
}

const RenderedFlatListItem = ({
  route,
  navigation,
  event,
}: RenderedFlatListItemProps) => {
  const theme = useTheme();
  const animatedOpacity = new Animated.Value(1);

  const fadeIn = () => {
    Animated.timing(animatedOpacity, {
      toValue: 0.4,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(animatedOpacity, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable
      onPressIn={fadeIn}
      onPressOut={fadeOut}
      onPress={() => {
        navigation.navigate("EventDetails", { event });
      }}
    >
      <Surface
        elevation={2}
        style={{
          borderRadius: 10,
          padding: 3,
          marginBottom: 30,
          ...(event.active
            ? {}
            : { backgroundColor: theme.colors.primaryContainer }),
        }}
      >
        <Animated.View style={{ opacity: animatedOpacity }}>
          <Image
            source={{
              uri: event.imageURI,
            }}
            placeholder="LJDvf|15iz-O~UvgW.%gDP?Z-pNd"
            contentFit="cover"
            transition={1000}
            style={{
              width: "100%",
              borderRadius: 10,
              height: 150,
            }}
            testID="image"
          />
          <View
            style={{ padding: 5, flexDirection: "row", alignItems: "center" }}
          >
            <View style={{ flex: 3 }}>
              <View style={{ flexDirection: "row", paddingBottom: 5 }}>
                <Text
                  variant="titleLarge"
                  style={{ fontWeight: "bold", flex: 1 }}
                  testID="title"
                >
                  {event.title}
                </Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View>
                  <Text variant="titleMedium">
                    {formatDateRange(event.startDate, event.endDate)}
                  </Text>
                  <Text variant="titleSmall">
                    {`${event.friendParticipants} znajomych ${event.active ? "weźmie" : "wzięło"} udział`}
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ alignItems: "center", flex: 1 }}>
              {event.active && event.lowAvailableSpace && (
                <View style={{ alignItems: "center" }}>
                  <Icon
                    source="alarm-light"
                    size={32}
                    color={theme.colors.error}
                  />
                  <Text variant="bodyMedium">ostatnie</Text>
                  <Text variant="bodyMedium">miejsca</Text>
                </View>
              )}
              {!event.active && (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Icon source="star" color="#FDDA0D" size={32} />
                  <Text variant="titleLarge">4.4</Text>
                </View>
              )}
            </View>
          </View>
        </Animated.View>
      </Surface>
    </Pressable>
  );
};

export default RenderedFlatListItem;
