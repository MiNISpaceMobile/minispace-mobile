import moment from "moment";
import { View } from "react-native";
import { Text } from "react-native-paper";

import IComment from "../../../../interfaces/Comment";
import ProfilePicture from "../../../ProfilePicture/ProfilePicture";

interface CommentsItemHeaderProps {
  comment: IComment;
}

const CommentsItemHeader = ({ comment }: CommentsItemHeaderProps) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        marginBottom: 10,
      }}
    >
      <ProfilePicture
        size={32}
        userFirstName={comment.owner.firstName}
        userLastName={comment.owner.lastName}
      />
      <Text variant="titleSmall" style={{ margin: 10 }}>
        {`${comment.owner.firstName} ${comment.owner.lastName}`}
      </Text>
      <Text>{moment(new Date(comment.createdAt)).locale("pl").fromNow()}</Text>
    </View>
  );
};

export default CommentsItemHeader;
