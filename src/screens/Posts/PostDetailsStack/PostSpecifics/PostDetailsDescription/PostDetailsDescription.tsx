import { useEffect, useState } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

import Skeleton from "../../../../../components/Skeleton/Skeleton";
import { usePostDetailsStore } from "../../../../../zustand/post-details";

const PostDetailsDescription = () => {
  const [title, setTitle] = useState<null | string>(null);
  const [content, setContent] = useState<null | string>(null);

  const postDetails = usePostDetailsStore((state) => state.postDetails);
  const loading = usePostDetailsStore((state) => state.loading);

  useEffect(() => {
    if (postDetails !== null) {
      setTitle(postDetails.title);
      setContent(postDetails.content);
    }
  }, [postDetails]);

  return (
    <View style={{ marginBottom: 10 }}>
      <View style={{ marginBottom: 10 }}>
        <Skeleton loading={loading} width="60%">
          <Text variant="titleLarge">{title}</Text>
        </Skeleton>
      </View>
      <Skeleton loading={loading}>
        <Text variant="bodyMedium">{content}</Text>
      </Skeleton>
    </View>
  );
};

export default PostDetailsDescription;
