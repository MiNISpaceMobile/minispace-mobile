import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

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
        onPress={onPress}
        disabled={selected}
      >
        {label}
      </Text>
    </View>
  );
};

export default EventDetailsContentTabLabel;
