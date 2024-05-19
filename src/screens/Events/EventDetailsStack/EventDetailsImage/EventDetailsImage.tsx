import { Image } from "expo-image";

interface EventDetailsImageProps {
  imageURI?: string;
}

const EventDetailsImage = ({ imageURI }: EventDetailsImageProps) => {
  return (
    <Image
      source={{ uri: imageURI }}
      placeholder="LJDvf|15iz-O~UvgW.%gDP?Z-pNd"
      contentFit="cover"
      transition={1000}
      style={{ width: "100%", height: 200 }}
    />
  );
};

export default EventDetailsImage;
