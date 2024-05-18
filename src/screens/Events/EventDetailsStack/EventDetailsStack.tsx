import { View, Text } from "react-native";

interface EventDetailsStackProps {
  route: any;
  navigation: any;
}

const EventDetailsStack = ({ route, navigation }: EventDetailsStackProps) => {
  return (
    <View>
      <Text>EventDetailsStack</Text>
    </View>
  );
};

export default EventDetailsStack;
