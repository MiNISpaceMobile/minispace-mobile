import { SegmentedButtons } from "react-native-paper";

import { TimeFrameType } from "../../../../../interfaces/PostFilters";
import { usePostFiltersStore } from "../../../../../zustand/post-filters";
import FilterListItem from "../FilterListItem/FilterListItem";

const TimeFrameSegmentedButtons = () => {
  const filters = usePostFiltersStore((state) => state.filters);
  const setFilters = usePostFiltersStore((state) => state.setFilters);

  return (
    <FilterListItem label="Termin wydwarzenia">
      <SegmentedButtons
        value={filters.timeframe}
        onValueChange={(value: string[]) => {
          setFilters({ ...filters, timeframe: value as TimeFrameType[] });
        }}
        buttons={[
          { value: "past", label: "minione", style: { flex: 1 } },
          { value: "current", label: "trwające", style: { flex: 1 } },
          { value: "future", label: "zaplanowane", style: { flex: 2 } },
        ]}
        multiSelect
      />
    </FilterListItem>
  );
};

export default TimeFrameSegmentedButtons;
