import { Checkbox } from "react-native-paper";

import { useEventFiltersStore } from "../../../../../zustand/event-filters";
import FilterListItem from "../FilterListItem/FilterListItem";

const EventAttributesCheckbox = () => {
  const filters = useEventFiltersStore((state) => state.filters);
  const setFilters = useEventFiltersStore((state) => state.setFilters);

  return (
    <FilterListItem label="Tylko wydarzenia">
      <Checkbox.Item
        label="które mają wolne miejsca"
        status={filters.needAvailableSpace ? "checked" : "unchecked"}
        onPress={() => {
          setFilters({
            ...filters,
            needAvailableSpace: !filters.needAvailableSpace,
          });
        }}
        position="leading"
      />
    </FilterListItem>
  );
};

export default EventAttributesCheckbox;
