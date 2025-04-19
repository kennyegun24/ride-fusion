import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("screen");
const baseColors = [
  "rgba(0, 0, 0, 0.15)", // on top of #269355-ish green
  "rgba(0, 0, 0, 0.2)", // on top of deep emerald
  "rgba(255, 255, 255, 0.05)", // light mist on top of dark forest
];

interface ColorPropsProps {
  scrollX: SharedValue<number>;
  data: any[];
}
const Circle: FC<ColorPropsProps> = ({ data, scrollX }) => {
  const colors = baseColors.flatMap((color, i) =>
    i === 0 ? [color] : [color, color]
  );
  const inputRange = Array.from(
    { length: data.length * 2 - 1 },
    (_, i) => i * (width / 2)
  );
  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      scrollX.value,
      inputRange,
      Array.from({ length: inputRange.length }, (_, i) =>
        i % 2 === 0 ? 1 : 0.1
      ),
      Extrapolation.CLAMP
    );

    const opacity = interpolate(
      scrollX.value,
      inputRange,
      Array.from({ length: inputRange.length }, (_, i) =>
        i % 2 === 0 ? 1 : 0.1
      ),
      Extrapolation.CLAMP
    );

    const skewX = interpolate(
      scrollX.value,
      [0, (data.length - 1) * width],
      [0, 15],
      Extrapolation.CLAMP
    );

    const transformSkewX = `${skewX}deg`;

    const colorIndex = Math.floor(
      interpolate(
        scrollX.value,
        [0, (data.length - 1) * width],
        [0, colors.length - 1],
        Extrapolation.CLAMP
      )
    );
    const backgroundColor = colors[colorIndex % colors.length];
    return {
      opacity,
      backgroundColor,
      transform: [{ scale }, { skewX: transformSkewX }],
    };
  });
  return <Animated.View style={[styles.containerStyle, animatedStyle]} />;
};

export default Circle;

const styles = StyleSheet.create({
  containerStyle: {
    width: height * 1.2,
    height: height * 1.2,
    borderRadius: height * 1.2,
    top: -height * 0.6,
    left: -height * 0.6,
    position: "absolute",
  },
});
