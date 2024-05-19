import { useEffect, useState } from "react";
import { View } from "react-native";

import PostDetailsDescription from "./PostDetailsDescription/PostDetailsDescription";
import PostDetailsImage from "./PostDetailsImage/PostDetailsImage";
import PostDetailsReactions from "./PostDetailsReactions/PostDetailsReactions";
import { usePostDetailsStore } from "../../../../zustand/post-details";

interface PostSpecificsProps {
  route: any;
  navigation: any;
}

const PostSpecifics = ({ route, navigation }: PostSpecificsProps) => {
  const [imageURI, setImageURI] = useState("");

  const postDetails = usePostDetailsStore((state) => state.postDetails);

  useEffect(() => {
    if (postDetails !== null) {
      setImageURI(postDetails.imageURI);
    }
  }, [postDetails]);

  return (
    <View>
      <PostDetailsImage
        route={route}
        navigation={navigation}
        imageURI={imageURI}
        eventId={postDetails ? postDetails.eventId : null}
      />
      <View style={{ padding: 10 }}>
        <PostDetailsDescription />
        <PostDetailsReactions />
      </View>
    </View>
  );
};

export default PostSpecifics;
