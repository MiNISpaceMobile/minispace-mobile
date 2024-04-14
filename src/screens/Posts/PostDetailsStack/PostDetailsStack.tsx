import { useEffect } from "react";
import { ScrollView } from "react-native";

import Header from "./Header/Header";
import PostComments from "./PostComments/PostComments";
import PostDetails from "./PostDetails/PostDetails";
import { useNavigationStore } from "../../../zustand/navigation";

interface PostDetailsStackProps {
  route: any;
  navigation: any;
}

const PostDetailsStack = ({ route, navigation }: PostDetailsStackProps) => {
  const setDisplay = useNavigationStore((state) => state.setDisplay);

  useEffect(() => {
    setDisplay("none");

    // https://stackoverflow.com/a/64789273
    const unsubscribe = navigation.addListener("beforeRemove", (e: any) => {
      e.preventDefault();
      unsubscribe();
      setDisplay("flex");
      navigation.navigate("PostList");
    });
  }, [navigation]);

  return (
    <ScrollView>
      <Header
        route={route}
        navigation={navigation}
        title="Varsonalia PW 2024"
      />
      <PostDetails route={route} navigation={navigation} />
      <PostComments route={route} navigation={navigation} />
    </ScrollView>
  );
};

export default PostDetailsStack;
