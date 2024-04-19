import { Searchbar } from "react-native-paper";

import { usePostFiltersStore } from "../../../../../zustand/post-filters";
import FilterListItem from "../FilterListItem/FilterListItem";

const EventTitleSearchbar = () => {
  const filters = usePostFiltersStore((state) => state.filters);
  const setFilters = usePostFiltersStore((state) => state.setFilters);

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
