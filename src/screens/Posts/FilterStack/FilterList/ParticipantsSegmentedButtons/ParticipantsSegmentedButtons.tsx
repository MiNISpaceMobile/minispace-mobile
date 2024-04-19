import { SegmentedButtons } from "react-native-paper";

import { ParticipantsType } from "../../../../../interfaces/PostFilters";
import { usePostFiltersStore } from "../../../../../zustand/post-filters";
import FilterListItem from "../FilterListItem/FilterListItem";

const ParticipantsSegmentedButtons = () => {
  const filters = usePostFiltersStore((state) => state.filters);
  const setFilters = usePostFiltersStore((state) => state.setFilters);

  return (
    <FilterListItem label="Liczba uczestników">
      <SegmentedButtons
        value={filters.participants}
        onValueChange={(value: string) => {
          setFilters({ ...filters, participants: value as ParticipantsType });
        }}
        buttons={[
          { value: "0+", label: "0+" },
          { value: "50+", label: "50+" },
          { value: "100+", label: "100+" },
        ]}
      />
    </FilterListItem>
  );
};

export default ParticipantsSegmentedButtons;
