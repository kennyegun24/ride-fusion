import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("screen");
interface IndicatorProps {
  scrollX: SharedValue<number>;
  data: any[];
}
const Indicator: FC<IndicatorProps> = ({ data, scrollX }) => {
  return (
    <View style={{ position: "absolute", bottom: 100, flexDirection: "row" }}>
      {data.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        const animatedStyle = useAnimatedStyle(() => {
          const scale = interpolate(
            scrollX.value,
            inputRange,
            [0.8, 1.4, 0.8],
            Extrapolation.CLAMP
          );
          const opacity = interpolate(
            scrollX.value,
            inputRange,
            [0.6, 0.9, 0.6],
            Extrapolation.CLAMP
          );

          return {
            opacity,
            transform: [{ scale }],
          };
        });

        return (
          <Animated.View
            key={i}
            style={[
              animatedStyle,
              {
                height: 10,
                width: 10,
                borderRadius: 5,
                backgroundColor: "white",
                margin: 7,
              },
            ]}
          />
        );
      })}
    </View>
  );
};

export default Indicator;

const styles = StyleSheet.create({});
