import { Image } from "expo-image";
import { Animated, Pressable, View } from "react-native";
import { Surface, Text } from "react-native-paper";

import IPost from "../../../../../../interfaces/Post";

interface RenderedFlatListItemProps {
  route: any;
  navigation: any;
  post: IPost;
}

const RenderedFlatListItem = ({
  route,
  navigation,
  post,
}: RenderedFlatListItemProps) => {
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
        navigation.navigate("PostDetails", { postId: post.id });
      }}
    >
      <Surface
        elevation={2}
        style={{
          borderRadius: 10,
          padding: 3,
          marginBottom: 30,
        }}
      >
        <Animated.View style={{ opacity: animatedOpacity }}>
          <Image
            source={{ uri: post.imageURI }}
            placeholder={{ blurhash: "LJDvf|15iz-O~UvgW.%gDP?Z-pNd" }}
            contentFit="cover"
            transition={1000}
            style={{
              width: "100%",
              borderRadius: 10,
              height: 150,
            }}
            testID="image"
          />
          <View style={{ padding: 5 }}>
            <Text
              variant="titleLarge"
              style={{ fontWeight: "bold" }}
              testID="title"
            >
              {post.title}
            </Text>
            <Text variant="titleMedium" testID="content">
              {post.content}
            </Text>
          </View>
        </Animated.View>
      </Surface>
    </Pressable>
  );
};

export default RenderedFlatListItem;
