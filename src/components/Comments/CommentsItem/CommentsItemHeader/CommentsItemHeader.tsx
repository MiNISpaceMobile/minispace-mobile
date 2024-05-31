import moment from "moment";
import { View } from "react-native";
import { Text } from "react-native-paper";

import ISimpleUser from "../../../../interfaces/SimpleUser";
import ProfilePicture from "../../../ProfilePicture/ProfilePicture";

interface CommentsItemHeaderProps {
  owner: ISimpleUser;
  createdAt: Date;
}

const CommentsItemHeader = ({ owner, createdAt }: CommentsItemHeaderProps) => {
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
        userFirstName={owner.firstName}
        userLastName={owner.lastName}
      />
      <Text variant="titleSmall" style={{ margin: 10 }}>
        {`${owner.firstName} ${owner.lastName}`}
      </Text>
      <Text>{moment(new Date(createdAt)).locale("pl").fromNow()}</Text>
    </View>
  );
};

export default CommentsItemHeader;
