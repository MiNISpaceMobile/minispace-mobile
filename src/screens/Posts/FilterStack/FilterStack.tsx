import { View } from "react-native";
import { Text } from "react-native-paper";

interface FilterStackProps {
  route: any;
  navigation: any;
}

const FilterStack = ({ route, navigation }: FilterStackProps) => {
  return (
    <View>
      <Text>Filter</Text>
    </View>
  );
};

export default FilterStack;
