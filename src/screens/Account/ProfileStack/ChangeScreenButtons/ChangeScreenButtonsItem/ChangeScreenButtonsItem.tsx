import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import { IconSource } from "react-native-paper/lib/typescript/components/Icon";

import { useUserStore } from "../../../../../zustand/user";

interface ChangeScreenButtonsItemProps {
  navigation: any;
  routeName: string;
  label: string;
  icon: IconSource;
}

const ChangeScreenButtonsItem = ({
  navigation,
  routeName,
  label,
  icon,
}: ChangeScreenButtonsItemProps) => {
  const user = useUserStore((state) => state.user);

  return (
    <View style={{ marginVertical: 20 }}>
      <Button
        contentStyle={{ margin: 15 }}
        labelStyle={{ fontSize: 24 }}
        icon={icon}
        mode="contained-tonal"
        onPress={() => navigation.navigate(routeName)}
        disabled={user === null}
      >
        <Text variant="headlineSmall">{label}</Text>
      </Button>
    </View>
  );
};

export default ChangeScreenButtonsItem;
