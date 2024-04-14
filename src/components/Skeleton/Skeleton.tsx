import SkeletonExpo from "moti/build/skeleton/expo";
import { ReactChild } from "react";
import { DimensionValue } from "react-native";
import { useTheme } from "react-native-paper";

interface SkeletonProps {
  children: ReactChild | null | undefined;
  loading: boolean;
  height?: DimensionValue;
  width?: DimensionValue;
}

const Skeleton = ({ children, loading, height, width }: SkeletonProps) => {
  const theme = useTheme();

  return (
    <SkeletonExpo
      width={width}
      show={loading}
      height={height}
      colors={[theme.colors.secondaryContainer, theme.colors.primaryContainer]}
    >
      {children}
    </SkeletonExpo>
  );
};

export default Skeleton;
