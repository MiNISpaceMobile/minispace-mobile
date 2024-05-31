import { SegmentedButtons } from "react-native-paper";

import { TimeFrameType } from "../../../../../interfaces/EventFilters";
import { useEventFiltersStore } from "../../../../../zustand/event-filters";
import FilterListItem from "../FilterListItem/FilterListItem";

const TimeFrameSegmentedButtons = () => {
  const filters = useEventFiltersStore((state) => state.filters);
  const setFilters = useEventFiltersStore((state) => state.setFilters);

  return (
    <FilterListItem label="Termin wydarzenia">
      <SegmentedButtons
        value={filters.timeframe}
        onValueChange={(value: string[]) => {
          setFilters({ ...filters, timeframe: value as TimeFrameType[] });
        }}
        buttons={[
          {
            value: "Past",
            label: "minione",
            style: { flex: 1 },
            showSelectedCheck: true,
          },
          {
            value: "Current",
            label: "trwające",
            style: { flex: 1 },
            showSelectedCheck: true,
          },
          {
            value: "Future",
            label: "zaplanowane",
            style: { flex: 2 },
            showSelectedCheck: true,
          },
        ]}
        multiSelect
      />
    </FilterListItem>
  );
};

export default TimeFrameSegmentedButtons;
