import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import SkeletonExpo from "moti/build/skeleton/expo";
import React, {
  JSXElementConstructor,
  ReactChild,
  ReactElement,
  useEffect,
} from "react";
import {
  DimensionValue,
  View,
  StyleSheet,
  LayoutRectangle,
} from "react-native";
import { useTheme } from "react-native-paper";
import Reanimated, {
  useSharedValue,
  withRepeat,
  useAnimatedStyle,
  withTiming,
  interpolate,
} from "react-native-reanimated";

interface SkeletonProps {
  children: ReactElement<any, string | JSXElementConstructor<any>>;
  loading: boolean;
  height?: DimensionValue;
  width?: DimensionValue;
}

const Skeleton = ({ children, loading, height, width }: SkeletonProps) => {
  const theme = useTheme();

  const [layout, setLayout] = React.useState<LayoutRectangle | null>(null);

  const shared = useSharedValue(0);

  const animStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            shared.value,
            [0, 1],
            [layout ? -layout.width : 0, layout ? layout.width : 0],
          ),
        },
      ],
    };
  });

  useEffect(() => {
    shared.value = withRepeat(withTiming(1, { duration: 2000 }), Infinity);
  }, []);

  if (!layout) {
    return (
      <View onLayout={(event) => setLayout(event.nativeEvent.layout)}>
        {children}
      </View>
    );
  }

  if (loading) {
    return (
      <View
        style={{
          width: width ? width : layout.width,
          height: height ? height : layout.height,
        }}
      >
        <View
          style={{
            flexGrow: 1,
            overflow: "hidden",
            backgroundColor: theme.colors.primaryContainer,
            borderRadius: 5,
          }}
        >
          <Reanimated.View style={[StyleSheet.absoluteFill, animStyle]}>
            <MaskedView
              style={StyleSheet.absoluteFill}
              maskElement={
                <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={StyleSheet.absoluteFill}
                  colors={["transparent", "black", "transparent"]}
                />
              }
            >
              <View
                style={[
                  StyleSheet.absoluteFill,
                  { backgroundColor: theme.colors.tertiaryContainer },
                ]}
              />
            </MaskedView>
          </Reanimated.View>
        </View>
      </View>
    );
  }

  return children;
};

export default Skeleton;
