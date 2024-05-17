import { Searchbar } from "react-native-paper";

import { useEventFiltersStore } from "../../../../../zustand/event-filters";
import FilterListItem from "../FilterListItem/FilterListItem";

const OrganizerSearchbar = () => {
  const filters = useEventFiltersStore((state) => state.filters);
  const setFilters = useEventFiltersStore((state) => state.setFilters);

  return (
    <FilterListItem label="Nazwa organizatora">
      <Searchbar
        value={filters.organizer ?? ""}
        onChangeText={(value: string) => {
          setFilters({ ...filters, organizer: value });
        }}
      />
    </FilterListItem>
  );
};

export default OrganizerSearchbar;
