import { SegmentedButtons } from "react-native-paper";

import { ParticipantsType } from "../../../../../interfaces/EventFilters";
import { usePostFiltersStore } from "../../../../../zustand/post-filters";
import FilterListItem from "../FilterListItem/FilterListItem";

const ParticipantsSegmentedButtons = () => {
  const filters = usePostFiltersStore((state) => state.filters);
  const setFilters = usePostFiltersStore((state) => state.setFilters);

  return (
    <FilterListItem label="Liczba uczestników">
      <SegmentedButtons
        value={filters.participants}
        onValueChange={(value: string[]) => {
          setFilters({ ...filters, participants: value as ParticipantsType[] });
        }}
        buttons={[
          { value: "0-50", label: "0-50" },
          { value: "50-100", label: "50-100" },
          { value: "100+", label: "100+" },
        ]}
        multiSelect
      />
    </FilterListItem>
  );
};

export default ParticipantsSegmentedButtons;
