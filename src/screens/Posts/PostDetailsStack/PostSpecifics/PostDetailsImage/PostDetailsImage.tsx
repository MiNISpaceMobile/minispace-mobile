import { Image } from "expo-image";
import { View } from "react-native";

interface PostDetailsImageProps {
  route: any;
  navigation: any;
  imageURI: string;
}

// TODO: pressing image should navigate to event page
const PostDetailsImage = ({
  route,
  navigation,
  imageURI,
}: PostDetailsImageProps) => {
  return (
    <View>
      <Image
        source={{
          uri: imageURI,
        }}
        placeholder="LJDvf|15iz-O~UvgW.%gDP?Z-pNd"
        contentFit="cover"
        transition={1000}
        style={{
          width: "100%",
          height: 200,
        }}
      />
    </View>
  );
};

export default PostDetailsImage;
