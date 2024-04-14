import { useEffect } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

import PostDetailsActions from "./PostDetailsActions/PostDetailsActions";
import PostDetailsDescription from "./PostDetailsDescription/PostDetailsDescription";
import PostDetailsImage from "./PostDetailsImage/PostDetailsImage";
import PostDetailsParticipants from "./PostDetailsParticipants/PostDetailsParticipants";
import PostDetailsReactions from "./PostDetailsReactions/PostDetailsReactions";
import Post from "../../../../interfaces/Post";
import { usePostDetailsStore } from "../../../../zustand/post-details";

interface PostDetailsProps {
  route: any;
  navigation: any;
}

const PostDetails = ({ route, navigation }: PostDetailsProps) => {
  const { post } = route.params as { post: Post };

  const postDetails = usePostDetailsStore((state) => state.postDetails);
  const error = usePostDetailsStore((state) => state.error);
  const loading = usePostDetailsStore((state) => state.loading);
  const fetchPostDetails = usePostDetailsStore(
    (state) => state.fetchPostDetails,
  );

  useEffect(() => {
    fetchPostDetails(post.id);
  }, []);

  return loading ? (
    <View>
      <Text>Loading...</Text>
    </View>
  ) : error || postDetails === null ? (
    <View>
      <Text>Error</Text>
    </View>
  ) : (
    <View>
      <PostDetailsImage
        route={route}
        navigation={navigation}
        imageURI={postDetails.imageURI}
      />
      <View
        style={{
          padding: 10,
        }}
      >
        <PostDetailsActions />
        <PostDetailsParticipants />
        <PostDetailsDescription
          title={postDetails.title}
          content={postDetails.content}
        />
        <PostDetailsReactions />
      </View>
    </View>
  );
};

export default PostDetails;
