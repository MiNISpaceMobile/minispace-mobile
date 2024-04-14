import { View } from "react-native";
import { Button } from "react-native-paper";

// TODO: implement action buttons
const PostDetailsActions = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
      }}
    >
      <Button
        icon="flag-variant"
        mode="contained"
        style={{ margin: 10 }}
        onPress={() => {}}
      >
        Zgłoś
      </Button>
      <Button
        icon="book-cancel"
        mode="contained"
        style={{ margin: 10 }}
        onPress={() => {}}
      >
        Opuść
      </Button>
      <Button
        icon="book"
        mode="contained"
        style={{ margin: 10 }}
        onPress={() => {}}
      >
        Dołącz
      </Button>
    </View>
  );
};

export default PostDetailsActions;
