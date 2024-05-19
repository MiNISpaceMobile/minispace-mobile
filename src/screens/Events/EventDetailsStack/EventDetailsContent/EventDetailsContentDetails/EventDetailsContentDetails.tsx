import { useEffect, useState } from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Icon, Text } from "react-native-paper";

import Skeleton from "../../../../../components/Skeleton/Skeleton";
import formatDateRange from "../../../../../lib/formatDateRange";
import { useEventDetailsStore } from "../../../../../zustand/event-details";

const EventDetailsContentDetails = () => {
  const [description, setDescription] = useState<string | null>(null);
  const [location, setLocation] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const eventDetails = useEventDetailsStore((state) => state.eventDetails);
  const loading = useEventDetailsStore((state) => state.loading);

  useEffect(() => {
    if (eventDetails) {
      setDescription(eventDetails.description);
      setLocation(eventDetails.location);
      setStartDate(eventDetails.startDate);
      setEndDate(eventDetails.endDate);
    }
  }, [eventDetails]);

  return (
    <ScrollView style={{ padding: 10 }}>
      <Text variant="titleLarge" style={{ marginBottom: 5 }}>
        Opis
      </Text>
      <Skeleton loading={loading}>
        <Text variant="bodyMedium" style={{ marginBottom: 10 }}>
          {description}
        </Text>
      </Skeleton>
      <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
        <Icon source="calendar-month" size={32} />
        <Skeleton loading={loading} height={32} width="100%">
          <Text variant="bodyMedium" style={{ marginLeft: 10 }}>
            {startDate && endDate ? formatDateRange(startDate, endDate) : null}
          </Text>
        </Skeleton>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
        <Icon source="map-marker" size={32} />
        <Skeleton loading={loading} height={32} width="100%">
          <Text variant="bodyMedium" style={{ marginLeft: 10 }}>
            {location}
          </Text>
        </Skeleton>
      </View>
    </ScrollView>
  );
};

export default EventDetailsContentDetails;
