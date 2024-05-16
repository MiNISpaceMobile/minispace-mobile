import { Checkbox } from "react-native-paper";

import { usePostFiltersStore } from "../../../../../zustand/post-filters";
import FilterListItem from "../FilterListItem/FilterListItem";

const EventAttributesCheckbox = () => {
  const filters = usePostFiltersStore((state) => state.filters);
  const setFilters = usePostFiltersStore((state) => state.setFilters);

  return (
    <FilterListItem label="Tylko wydarzenia">
      <Checkbox.Item
        label="w których biorę udział"
        status={filters.hasToBeRegisteredForEvent ? "checked" : "unchecked"}
        onPress={() => {
          setFilters({
            ...filters,
            hasToBeRegisteredForEvent: !filters.hasToBeRegisteredForEvent,
          });
        }}
      />
      <Checkbox.Item
        label="w których biorą udział moi znajomi"
        status={
          filters.hasToHaveFriendRegisteredForEvent ? "checked" : "unchecked"
        }
        onPress={() => {
          setFilters({
            ...filters,
            hasToHaveFriendRegisteredForEvent:
              !filters.hasToHaveFriendRegisteredForEvent,
          });
        }}
      />
      {/* TODO: only display if user is organizer */}
      {/* <Checkbox.Item
        label="które organizuję"
        status={filters.hasToBeRegisteredForEvent ? "checked" : "unchecked"}
        onPress={() => {
          setFilters({
            ...filters,
            hasToBeRegisteredForEvent: !filters.hasToBeRegisteredForEvent,
          });
        }}
      /> */}
    </FilterListItem>
  );
};

export default EventAttributesCheckbox;
