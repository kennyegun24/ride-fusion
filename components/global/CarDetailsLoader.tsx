import {
  Dimensions,
  ScrollView,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";
import React, { useEffect } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { ThemedView } from "../ThemedView";
const CarDetailsLoader = () => {
  const { width } = Dimensions.get("screen");
  const opacity = useSharedValue(1);
  const translateX = useSharedValue(-width);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.3, {
          duration: 1000,
        }),
        withTiming(1, {
          duration: 1000,
        })
      ),
      Infinity,
      true
    );
    translateX.value = withRepeat(
      withTiming(width, { duration: 2400 }),
      -1,
      true
    );
  }, []);

  const animatedShimmerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const animatedStyleInverse = useAnimatedStyle(() => {
    return {
      opacity: 1.2 - opacity.value, // 👈 this gives you the opposite
    };
  });

  const animatedStyleInverse2 = useAnimatedStyle(() => {
    return {
      opacity: 1.5 - opacity.value, // 👈 this gives you the opposite
    };
  });

  const animatedStyleInverse3 = useAnimatedStyle(() => {
    return {
      opacity: opacity.value * 1.4, // 👈 this gives you the opposite
    };
  });
  const theme = useColorScheme();
  const color = theme === "dark" ? "#151718" : "#C4C4C4";
  const skeleton = {
    backgroundColor: color, // light grey
    borderRadius: 6,
  };
  return (
    <ThemedView style={{ flex: 1 }}>
      <View style={[{ width: width, height: 250, backgroundColor: color }]}>
        <Animated.View style={[animatedShimmerStyle, styles.shimmerOverlay]} />
      </View>

      <ScrollView style={{ padding: 12 }}>
        <View
          style={{
            marginVertical: 12,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Animated.View
            style={[
              skeleton,
              { width: 120, height: 20 },
              animatedStyleInverse3,
            ]}
          />
          <Animated.View
            style={[skeleton, { width: 80, height: 20 }, animatedStyleInverse3]}
          />
        </View>

        <View style={{ gap: 6, marginTop: 12 }}>
          <Animated.View
            style={[
              skeleton,
              { width: 100, height: 16 },
              animatedStyleInverse3,
            ]}
          />
          <Animated.View
            style={[
              skeleton,
              { width: 150, height: 16 },
              animatedStyleInverse3,
            ]}
          />
        </View>

        <View style={{ marginVertical: 16 }}>
          <Animated.View
            style={[
              animatedStyleInverse2,
              skeleton,
              { width: width - 24, height: 120 },
            ]}
          />
        </View>

        <View
          style={{
            marginTop: 20,
            flexDirection: "row",
            alignItems: "center",
            gap: 12,
          }}
        >
          <Animated.View
            style={[
              skeleton,
              { width: 50, height: 50, borderRadius: 50 },
              animatedStyleInverse,
            ]}
          />
          <View style={{ gap: 5 }}>
            <Animated.View
              style={[
                animatedStyleInverse,
                skeleton,
                { width: 100, height: 16 },
              ]}
            />
            <Animated.View
              style={[
                animatedStyleInverse,
                skeleton,
                { width: 120, height: 16 },
              ]}
            />
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
};

export default CarDetailsLoader;

const styles = StyleSheet.create({
  shimmerOverlay: {
    width: 200, // width of shimmer stripe
    height: "100%",
    backgroundColor: "rgba(255,255,255,0.1)", // semi-transparent white
    elevation: 50,
    shadowColor: "rgba(255,255,255,0.08)",
    shadowRadius: 10,
    shadowOpacity: 0.5,
    // borderRadius: 8,
  },
});
