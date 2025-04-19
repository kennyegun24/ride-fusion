import { FC } from "react";
import { SliderItem } from "./types";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { StyleSheet, View } from "react-native";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("screen");

const OnboardingItem: FC<{
  item: SliderItem;
  index: number;
  scrollX: SharedValue<number>;
}> = ({ index, item, scrollX }) => {
  const imageAnimatedStyle = useAnimatedStyle(() => {
    const inputRange = [
      (index - 1) * width,
      index * width,
      (index + 1) * width,
    ];

    const scale = interpolate(
      scrollX.value,
      inputRange,
      [0, 1, 0],
      Extrapolation.CLAMP
    );

    const rotate = `${interpolate(
      scrollX.value,
      inputRange,
      [-15, 1, -15],
      Extrapolation.CLAMP
    )}deg`;

    const opacity = interpolate(
      scrollX.value,
      inputRange,
      [0, 1, 0],
      Extrapolation.CLAMP
    );
    return {
      opacity,
      transform: [{ scale }, { rotate }],
    };
  });

  const animatedStyle = (translateOffset: number, skewOffset: number) =>
    useAnimatedStyle(() => {
      const inputRange = [
        (index - 1) * width,
        index * width,
        (index + 1) * width,
      ];

      const translateY = interpolate(
        scrollX.value,
        inputRange,
        [translateOffset, 0, -translateOffset],
        Extrapolation.CLAMP
      );

      const skewY = `${interpolate(
        scrollX.value,
        inputRange,
        [-skewOffset, 1, skewOffset],
        Extrapolation.CLAMP
      )}deg`;

      const opacity = interpolate(
        scrollX.value,
        inputRange,
        [0, 1, 0],
        Extrapolation.CLAMP
      );
      return {
        opacity,
        transform: [{ translateY }, { skewY }],
      };
    });

  return (
    <View style={styles.itemContainer}>
      <View style={styles.imageContainer}>
        <Animated.Image
          source={item.image}
          style={[styles.image, imageAnimatedStyle]}
        />
      </View>
      <View style={styles.textContainer}>
        <Animated.Text style={[styles.title, animatedStyle(50, 10)]}>
          {item.title}
        </Animated.Text>
        <Animated.Text style={[styles.description, animatedStyle(30, 10)]}>
          {item.description}
        </Animated.Text>
      </View>
    </View>
  );
};

export default OnboardingItem;

const styles = StyleSheet.create({
  itemContainer: {
    width,
    alignItems: "center",
    // gap: 12,
    padding: 24,
  },
  imageContainer: {
    flex: 0.7,
    justifyContent: "center",
    // marginTop: -16,
  },
  image: {
    width: width * 0.95,
    height: width * 0.95,
    resizeMode: "contain",
  },
  textContainer: {
    flex: 0.3,
  },
  title: {
    fontSize: 24,
    fontWeight: 800,
    marginBottom: 10,
    color: "white",
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    fontWeight: 300,
    color: "white",
    textAlign: "center",
  },
});
