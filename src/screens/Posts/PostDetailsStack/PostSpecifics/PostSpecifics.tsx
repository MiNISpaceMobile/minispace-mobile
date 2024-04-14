import { useEffect, useState } from "react";
import { View } from "react-native";

import PostDetailsActions from "./PostDetailsActions/PostDetailsActions";
import PostDetailsDescription from "./PostDetailsDescription/PostDetailsDescription";
import PostDetailsImage from "./PostDetailsImage/PostDetailsImage";
import PostDetailsParticipants from "./PostDetailsParticipants/PostDetailsParticipants";
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
      />
      <View style={{ padding: 10 }}>
        <PostDetailsActions />
        <PostDetailsParticipants />
        <PostDetailsDescription />
        <PostDetailsReactions />
      </View>
    </View>
  );
};

export default PostSpecifics;
