import { useState } from "react";
import { View } from "react-native";
import { Button, Portal, Snackbar, Text, useTheme } from "react-native-paper";
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
  const theme = useTheme();

  const [dialogVisible, setDialogVisible] = useState(false);

  const showDialog = () => {
    setDialogVisible(true);
  };

  const hideDialog = () => {
    setDialogVisible(false);
  };

  const user = useUserStore((state) => state.user);

  return (
    <View style={{ marginVertical: 20 }}>
      <Button
        style={{
          backgroundColor: user
            ? theme.colors.primaryContainer
            : theme.colors.surfaceDisabled,
        }}
        contentStyle={{ margin: 15 }}
        labelStyle={{
          fontSize: 24,
          color: user
            ? theme.colors.onPrimaryContainer
            : theme.colors.onSurfaceDisabled,
        }}
        icon={icon}
        mode="contained-tonal"
        onPress={() => {
          if (user) {
            navigation.navigate(routeName);
          } else {
            showDialog();
          }
        }}
      >
        <Text variant="headlineSmall">{label}</Text>
      </Button>
      <Portal>
        <Snackbar
          wrapperStyle={{ marginBottom: 10 }}
          visible={dialogVisible}
          onDismiss={hideDialog}
          action={{
            label: "Zamknij",
            onPress: hideDialog,
          }}
        >
          Tylko dla zalogowanych użytkowników!
        </Snackbar>
      </Portal>
    </View>
  );
};

export default ChangeScreenButtonsItem;
