import { SegmentedButtons } from "react-native-paper";

import { TimeFrameType } from "../../../../../interfaces/PostFilters";
import { usePostFiltersStore } from "../../../../../zustand/post-filters";
import FilterListItem from "../FilterListItem/FilterListItem";

const TimeFrameSegmentedButtons = () => {
  const filters = usePostFiltersStore((state) => state.filters);
  const setFilters = usePostFiltersStore((state) => state.setFilters);

  return (
    <FilterListItem label="Czas">
      <SegmentedButtons
        value={filters.timeframe}
        onValueChange={(value: string[]) => {
          setFilters({ ...filters, timeframe: value as TimeFrameType[] });
        }}
        buttons={[
          { value: "past", label: "minione" },
          { value: "current", label: "obecne" },
          { value: "future", label: "przyszłe" },
        ]}
        multiSelect
      />
    </FilterListItem>
  );
};

export default TimeFrameSegmentedButtons;
