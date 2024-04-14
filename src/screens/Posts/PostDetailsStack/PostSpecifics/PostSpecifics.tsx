import { useEffect, useState } from "react";
import { View } from "react-native";

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
}

const PostSpecifics = ({
  route,
  navigation,
  postDetails,
  loading,
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
        <PostDetailsParticipants loading={loading} />
        <PostDetailsDescription postDetails={postDetails} loading={loading} />
        <PostDetailsReactions loading={loading} />
      </View>
    </View>
  );
};

export default PostSpecifics;
