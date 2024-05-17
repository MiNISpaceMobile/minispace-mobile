import { Searchbar } from "react-native-paper";

import { usePostFiltersStore } from "../../../../../zustand/post-filters";
import FilterListItem from "../FilterListItem/FilterListItem";

const OrganizerSearchbar = () => {
  const filters = usePostFiltersStore((state) => state.filters);
  const setFilters = usePostFiltersStore((state) => state.setFilters);

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
