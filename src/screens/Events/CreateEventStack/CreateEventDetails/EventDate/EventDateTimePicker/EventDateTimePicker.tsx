import { useState } from "react";
import { View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Button, Text } from "react-native-paper";

interface EventDateTimePickerProps {
  date: Date;
  setDateHandler: (date: Date) => void;
  buttonLabel: string;
  textLabel: string;
  minimumDate?: Date;
}

const EventDateTimePicker = ({
  date,
  setDateHandler,
  buttonLabel,
  textLabel,
  minimumDate,
}: EventDateTimePickerProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const hideDatePicker = () => {
    setIsVisible(false);
  };

  return (
    <View>
      <Button onPress={() => setIsVisible(true)} mode="contained-tonal">
        {buttonLabel}
      </Button>
      <Text style={{ textAlign: "center" }}>
        {textLabel}
        {date.toLocaleDateString("pl", {
          weekday: "short",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </Text>
      <DateTimePickerModal
        date={date}
        mode="datetime"
        onConfirm={(date: Date) => {
          hideDatePicker();
          setDateHandler(date);
        }}
        onCancel={hideDatePicker}
        minimumDate={minimumDate}
        isVisible={isVisible}
        is24Hour
      />
    </View>
  );
};

export default EventDateTimePicker;
