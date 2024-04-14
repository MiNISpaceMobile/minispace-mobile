import { useEffect, useState } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

import PostDetailsActions from "./PostDetailsActions/PostDetailsActions";
import PostDetailsDescription from "./PostDetailsDescription/PostDetailsDescription";
import PostDetailsImage from "./PostDetailsImage/PostDetailsImage";
import PostDetailsParticipants from "./PostDetailsParticipants/PostDetailsParticipants";
import PostDetailsReactions from "./PostDetailsReactions/PostDetailsReactions";
import PostDetails from "../../../../interfaces/PostDetails";

interface PostSpecificsProps {
  route: any;
  navigation: any;
  postDetails: PostDetails | null;
  loading: boolean;
  error: string | null;
}

const PostSpecifics = ({
  route,
  navigation,
  postDetails,
  loading,
  error,
}: PostSpecificsProps) => {
  const [imageURI, setImageURI] = useState("");

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
      <View
        style={{
          padding: 10,
        }}
      >
        <PostDetailsActions />
        <PostDetailsParticipants />
        {/* <PostDetailsDescription
          title={postDetails.title}
          content={postDetails.content}
        /> */}
        <PostDetailsReactions />
      </View>
    </View>
  );
};

export default PostSpecifics;
