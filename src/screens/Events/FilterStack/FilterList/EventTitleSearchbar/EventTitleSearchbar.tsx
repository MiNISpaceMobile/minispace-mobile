import { Searchbar } from "react-native-paper";

import { useEventFiltersStore } from "../../../../../zustand/event-filters";
import FilterListItem from "../FilterListItem/FilterListItem";

const EventTitleSearchbar = () => {
  const filters = useEventFiltersStore((state) => state.filters);
  const setFilters = useEventFiltersStore((state) => state.setFilters);

  return (
    <FilterListItem label="Nazwa wydarzenia">
      <Searchbar
        value={filters.eventTitle ?? ""}
        onChangeText={(value: string) => {
          setFilters({ ...filters, eventTitle: value });
        }}
      />
    </FilterListItem>
  );
};

export default EventTitleSearchbar;
