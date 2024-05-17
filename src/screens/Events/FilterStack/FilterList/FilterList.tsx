import { ScrollView } from "react-native";

import CostSegmentedButtons from "./CostSegmentedButtons/CostSegmentedButtons";
import EventAttributesCheckbox from "./EventAttributesCheckbox.tsx/EventAttributesCheckbox";
import EventTitleSearchbar from "./EventTitleSearchbar/EventTitleSearchbar";
import OrganizerSearchbar from "./OrganizerSearchbar/OrganizerSearchbar";
import ParticipantsSegmentedButtons from "./ParticipantsSegmentedButtons/ParticipantsSegmentedButtons";
import TimeFrameSegmentedButtons from "./TimeFrameSegmentedButtons/TimeFrameSegmentedButtons";

const FilterList = () => {
  return (
    <ScrollView style={{ flex: 1 }}>
      <EventTitleSearchbar />
      <OrganizerSearchbar />
      <CostSegmentedButtons />
      <ParticipantsSegmentedButtons />
      <TimeFrameSegmentedButtons />
      <EventAttributesCheckbox />
    </ScrollView>
  );
};

export default FilterList;
