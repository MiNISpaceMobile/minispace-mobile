import { useEffect, useState } from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { Avatar } from "react-native-paper";

import { useUserStore } from "../../zustand/user";

interface ProfilePictureProps {
  size?: number;
  style?: StyleProp<ViewStyle>;
  userFirstName?: string;
  userLastName?: string;
  userProfilePicture?: string;
}

const ProfilePicture = ({
  size,
  style,
  userFirstName,
  userLastName,
  userProfilePicture,
}: ProfilePictureProps) => {
  const [firstName, setFirstName] = useState<string | null>(null);
  const [lastName, setLastName] = useState<string | null>(null);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);

  const user = useUserStore((state) => state.user);

  useEffect(() => {
    // if user profile picture or user first/last name is passed,
    // don't use data from user store
    if (userProfilePicture) {
      return;
    }

    if (userFirstName && userLastName) {
      return;
    }

    if (!user) {
      return;
    }

    setFirstName(user.firstName);
    setLastName(user.lastName);
    setProfilePicture(user.profilePicture);
  }, [user]);

  return (
    <View>
      {userProfilePicture ? (
        <Avatar.Image
          style={style}
          size={size}
          source={{ uri: userProfilePicture }}
        />
      ) : userFirstName && userLastName ? (
        <Avatar.Text
          style={style}
          size={size}
          label={userFirstName[0] + userLastName[0]}
        />
      ) : profilePicture ? (
        <Avatar.Image
          style={style}
          size={size}
          source={{ uri: profilePicture }}
        />
      ) : firstName && lastName ? (
        <Avatar.Text
          style={style}
          size={size}
          label={firstName[0] + lastName[0]}
        />
      ) : (
        <Avatar.Icon style={style} size={size} icon="account" />
      )}
    </View>
  );
};

export default ProfilePicture;
