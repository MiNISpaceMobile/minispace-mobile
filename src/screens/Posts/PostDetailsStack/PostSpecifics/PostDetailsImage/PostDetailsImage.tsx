import { Image } from "expo-image";
import { Pressable, Animated } from "react-native";

interface PostDetailsImageProps {
  route: any;
  navigation: any;
  imageURI: string;
  eventId: string | null;
}

const PostDetailsImage = ({
  route,
  navigation,
  imageURI,
  eventId,
}: PostDetailsImageProps) => {
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
        navigation.navigate("events", {
          screen: "EventDetails",
          params: { eventId },
        });
      }}
    >
      <Animated.View style={{ opacity: animatedOpacity }}>
        <Image
          source={{ uri: imageURI }}
          placeholder="LJDvf|15iz-O~UvgW.%gDP?Z-pNd"
          contentFit="cover"
          transition={1000}
          style={{ width: "100%", height: 200 }}
        />
      </Animated.View>
    </Pressable>
  );
};

export default PostDetailsImage;
