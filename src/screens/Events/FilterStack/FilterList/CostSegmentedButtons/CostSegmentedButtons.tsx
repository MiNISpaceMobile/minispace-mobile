import { SegmentedButtons } from "react-native-paper";

import { CostType } from "../../../../../interfaces/EventFilters";
import { useEventFiltersStore } from "../../../../../zustand/event-filters";
import FilterListItem from "../FilterListItem/FilterListItem";

const CostSegmentedButtons = () => {
  const filters = useEventFiltersStore((state) => state.filters);
  const setFilters = useEventFiltersStore((state) => state.setFilters);

  return (
    <FilterListItem label="Cena wydarzenia">
      <SegmentedButtons
        value={filters.cost}
        onValueChange={(value: string[]) => {
          setFilters({ ...filters, cost: value as CostType[] });
        }}
        buttons={[
          { value: "free", label: "darmowe", showSelectedCheck: true },
          { value: "paid", label: "płatne", showSelectedCheck: true },
        ]}
        multiSelect
      />
    </FilterListItem>
  );
};

export default CostSegmentedButtons;
