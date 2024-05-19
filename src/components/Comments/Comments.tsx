import { AxiosError } from "axios";
import { useEffect } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

import CommentsItem from "./CommentsItem/CommentsItem";
import ErrorStatus from "./ErrorStatus/ErrorStatus";
import IComment from "../../interfaces/Comment";
import Skeleton from "../Skeleton/Skeleton";

interface CommentsProps {
  comments: IComment[];
  error: AxiosError | null;
  loading: boolean;
}

const Comments = ({ comments, error, loading }: CommentsProps) => {
  return (
    <View style={{ padding: 10 }}>
      <Text variant="titleMedium">Komentarze:</Text>
      {error ? (
        <ErrorStatus />
      ) : (
        <Skeleton loading={loading} height={100} width="100%">
          <View>
            {comments.map((comment) => (
              <CommentsItem comment={comment} key={comment.id} />
            ))}
          </View>
        </Skeleton>
      )}
    </View>
  );
};

export default Comments;
