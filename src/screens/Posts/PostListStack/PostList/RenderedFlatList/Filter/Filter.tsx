import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Chip, Text } from "react-native-paper";

import { usePostFiltersStore } from "../../../../../../zustand/post-filters";
import { usePostsStore } from "../../../../../../zustand/posts";

const Filter = () => {
  const [checked, setChecked] = useState(true);

  const filters = usePostFiltersStore((state) => state.filters);
  const setFilters = usePostFiltersStore((state) => state.setFilters);
  const refresh = usePostsStore((state) => state.refresh);
  const fetchPosts = usePostsStore((state) => state.fetchPosts);

  useEffect(() => {
    setChecked(filters.friendRegisteredForEvent);
  }, []);

  const toggleCheck = () => {
    refresh();
    // pass `!checked` to make sure that there is no race condition with state updates
    fetchPosts({ friendRegisteredForEvent: !checked });
    setFilters({ friendRegisteredForEvent: !checked });
    setChecked((oldChecked) => !oldChecked);
  };

  return (
    <View
      style={{
        paddingBottom: 15,
        alignItems: "center",
        flexGrow: 1,
        overflow: "visible",
        flexDirection: "row",
        // backgroundColor: "red",
      }}
    >
      <Text variant="labelLarge" style={{ paddingHorizontal: 5 }}>
        Filtry:
      </Text>
      <Chip
        icon={checked ? "check" : ""}
        onPress={toggleCheck}
        selected={checked}
        showSelectedOverlay={checked}
      >
        wydarzenia znajomych
      </Chip>
    </View>
  );
};

export default Filter;
