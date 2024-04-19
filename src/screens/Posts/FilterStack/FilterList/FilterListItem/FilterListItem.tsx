import { PropsWithChildren } from "react";
import { Surface, Text } from "react-native-paper";

interface FilterListItemProps {
  label: string;
}

const FilterListItem = ({
  children,
  label,
}: PropsWithChildren<FilterListItemProps>) => {
  return (
    <Surface
      elevation={1}
      style={{
        padding: 10,
        margin: 10,
        borderRadius: 10,
      }}
    >
      <Text variant="headlineSmall" style={{ marginBottom: 10 }}>
        {label}
      </Text>
      {children}
    </Surface>
  );
};

export default FilterListItem;
