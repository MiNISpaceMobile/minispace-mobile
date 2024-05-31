import { SegmentedButtons } from "react-native-paper";

import { ParticipantsType } from "../../../../../interfaces/EventFilters";
import { useEventFiltersStore } from "../../../../../zustand/event-filters";
import FilterListItem from "../FilterListItem/FilterListItem";

const ParticipantsSegmentedButtons = () => {
  const filters = useEventFiltersStore((state) => state.filters);
  const setFilters = useEventFiltersStore((state) => state.setFilters);

  return (
    <FilterListItem label="Liczba uczestników">
      <SegmentedButtons
        value={filters.participants}
        onValueChange={(value: string[]) => {
          setFilters({ ...filters, participants: value as ParticipantsType[] });
        }}
        buttons={[
          { value: "To50", label: "0-50", showSelectedCheck: true },
          { value: "From50To100", label: "50-100", showSelectedCheck: true },
          { value: "Above100", label: "100+", showSelectedCheck: true },
        ]}
        multiSelect
      />
    </FilterListItem>
  );
};

export default ParticipantsSegmentedButtons;
