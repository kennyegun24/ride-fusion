import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import Animated, {
  interpolateColor,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

type BackDropProps = {
  scrollX: SharedValue<number>;
};

const { width } = Dimensions.get("screen");

const BGS = [
  "rgba(38, 147, 85, 0.7)",
  "rgba(20, 60, 40, 0.85)",
  "rgba(40, 100, 70, 0.9)",
];

const Backdrop: FC<BackDropProps> = ({ scrollX }) => {
  const animatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      scrollX.value,
      BGS.map((_, i) => i * width),
      BGS
    );
    return {
      backgroundColor,
      opacity: 0.9,
    };
  });
  return <Animated.View style={[StyleSheet.absoluteFill, animatedStyle]} />;
};

export default Backdrop;

const styles = StyleSheet.create({});
