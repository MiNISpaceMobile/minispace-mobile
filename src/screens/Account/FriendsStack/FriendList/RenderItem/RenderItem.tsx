import { View } from "react-native";
import { Text } from "react-native-paper";

import ProfilePicture from "../../../../../components/ProfilePicture/ProfilePicture";
import ISimpleUser from "../../../../../interfaces/SimpleUser";

interface RenderItemProps {
  route: any;
  navigation: any;
  item: ISimpleUser;
}

const RenderItem = ({ route, navigation, item }: RenderItemProps) => {
  return (
    <View
      style={{
        paddingVertical: 10,
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "center",
      }}
    >
      <ProfilePicture
        userProfilePicture={item.profilePicture}
        userFirstName={item.firstName}
        userLastName={item.lastName}
        size={100}
      />
      <View>
        <View style={{ flexDirection: "row", alignContent: "center" }}>
          <View>
            <Text variant="titleLarge" style={{ marginLeft: 20 }}>
              {item.firstName} {item.lastName}
            </Text>
            <Text variant="titleSmall" style={{ marginLeft: 20 }}>
              15 wspólnych znajomych
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RenderItem;
