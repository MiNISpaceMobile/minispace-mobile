import { View } from "react-native";

import Header from "../Header/Header";

interface EventListStackProps {
  route: any;
  navigation: any;
}

const EventListStack = ({ route, navigation }: EventListStackProps) => {
  return (
    <View>
      <Header route={route} navigation={navigation} />
    </View>
  );
};

export default EventListStack;
