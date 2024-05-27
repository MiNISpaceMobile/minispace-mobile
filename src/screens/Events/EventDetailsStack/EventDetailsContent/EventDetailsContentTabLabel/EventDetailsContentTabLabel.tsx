import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Portal, Snackbar, Text } from "react-native-paper";

import { useUserStore } from "../../../../../zustand/user";

interface EventDetailsContentTabLabelProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

const EventDetailsContentTabLabel = ({
  label,
  selected,
  onPress,
}: EventDetailsContentTabLabelProps) => {
  const [dialogVisible, setDialogVisible] = useState(false);

  const showDialog = () => {
    setDialogVisible(true);
  };

  const hideDialog = () => {
    setDialogVisible(false);
  };

  const user = useUserStore((state) => state.user);

  useEffect(() => {
    if (dialogVisible) {
      setTimeout(() => {
        hideDialog();
      }, 5000);
    }
  }, [dialogVisible]);

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Text
        variant="bodyLarge"
        style={{
          flex: 1,
          textAlign: "center",
          color: selected ? "black" : "grey",
          fontWeight: selected ? "bold" : "normal",
        }}
        onPress={user ? onPress : showDialog}
        disabled={selected}
      >
        {label}
      </Text>
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

export default EventDetailsContentTabLabel;
