import { useEffect } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

const { width } = Dimensions.get("screen");
export const ItemLoader = ({ no, height }: any) => {
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
  const fakeArray = Array.from({ length: no });
  return (
    <View
      style={{
        flexDirection: "row",
        gap: 8,
        width: "100%",
        flexWrap: "wrap",
      }}
    >
      {fakeArray.map((e, _) => (
        <Animated.View
          key={_}
          style={[
            _ % 4 === 0
              ? animatedStyleInverse
              : _ % 3 === 0
              ? animatedStyleInverse2
              : animatedStyleInverse3,
            styles.skeleton,
            {
              height: height || 120,
            },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: "#C4C4C4", // light grey
    borderRadius: 6,
    width: (width - 24) / 2.05,
  },
  shimmerOverlay: {
    width: 200, // width of shimmer stripe
    // height: "100%",
    backgroundColor: "rgba(255,255,255,0.5)", // semi-transparent white
    elevation: 50,
    shadowColor: "rgba(255,255,255,0.08)",
    shadowRadius: 10,
    shadowOpacity: 0.5,
    borderRadius: 8,
  },
});
