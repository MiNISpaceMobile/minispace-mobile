import { SegmentedButtons } from "react-native-paper";

import { CostType } from "../../../../../interfaces/PostFilters";
import { usePostFiltersStore } from "../../../../../zustand/post-filters";
import FilterListItem from "../FilterListItem/FilterListItem";

const CostSegmentedButtons = () => {
  const filters = usePostFiltersStore((state) => state.filters);
  const setFilters = usePostFiltersStore((state) => state.setFilters);

  return (
    <FilterListItem label="Koszt">
      <SegmentedButtons
        value={filters.cost}
        onValueChange={(value: string[]) => {
          setFilters({ ...filters, cost: value as CostType[] });
        }}
        buttons={[
          { value: "free", label: "darmowy" },
          { value: "paid", label: "płatny" },
        ]}
        multiSelect
      />
    </FilterListItem>
  );
};

export default CostSegmentedButtons;
