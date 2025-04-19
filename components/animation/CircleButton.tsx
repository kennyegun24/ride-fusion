import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from "react-native";
import React, { FC } from "react";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import right_arrow from "@/assets/images/right-arrow.png";

const { width, height } = Dimensions.get("screen");
interface CircleButtonProps {
  scrollX: SharedValue<number>;
  totalSize: number;
  onNext: () => void;
  onlogin: () => void;
  style: ViewStyle;
  canGoNext: boolean;
}

const CircleButton: FC<CircleButtonProps> = ({
  onNext,
  scrollX,
  style,
  totalSize,
  canGoNext,
  onlogin,
}) => {
  const isPressed = useSharedValue(false);
  const rippleScale = useSharedValue(0);
  const imageScale = useSharedValue(1);
  const imageOpacity = useSharedValue(1);

  const buttonAnimationStyle = useAnimatedStyle(() => ({
    // return {
    transform: [{ scale: withSpring(isPressed.value ? 0.8 : 1) }],
    opacity: withSpring(isPressed.value ? 0.9 : 1),
    // };
  }));

  const imageAnimationStyle = useAnimatedStyle(() => ({
    // return {
    transform: [{ scale: withSpring(imageScale.value) }],
    opacity: withSpring(imageScale.value, { duration: 300 }),
    // };
  }));

  const handlePressIn = () => {
    isPressed.value = true;
    (rippleScale.value = withTiming(1.5, { duration: 300 })),
      (imageScale.value = 0.8);
    imageOpacity.value = 0.7;
  };

  const handlePressOut = () => {
    isPressed.value = false;
    (rippleScale.value = 0), (imageScale.value = 1);
    imageOpacity.value = 1;
    onNext();
  };
  return (
    <>
      {canGoNext ? (
        <View style={[styles.container, style]}>
          <Animated.View style={[styles.buttonContainer, buttonAnimationStyle]}>
            <TouchableWithoutFeedback
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
            >
              <View style={styles.button}>
                <Animated.Image
                  source={right_arrow}
                  style={[styles.image, imageAnimationStyle]}
                />
                {/* <Animated.View style={[styles.ripple]} /> */}
              </View>
            </TouchableWithoutFeedback>
          </Animated.View>
        </View>
      ) : (
        <View
          style={{
            gap: 12,
            bottom: 20,
            paddingHorizontal: 24,
            position: "absolute",
          }}
        >
          <TouchableOpacity
            style={[styles.buttonLogin, styles.btnBg]}
            activeOpacity={0.8}
            onPressIn={onNext}
          >
            <Text style={styles.btnText}>Create Account</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttonLogin, styles.buttonLogin2]}
            activeOpacity={0.8}
            onPressIn={onlogin}
          >
            <Text style={[styles.btnText, styles.btnText2]}>Login</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default CircleButton;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 60,
    alignSelf: "center",
  },
  buttonContainer: { justifyContent: "center", alignItems: "center" },
  button: {
    height: 55,
    width: 55,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#269355",
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  image: { height: 15, width: 15, tintColor: "white" },
  buttonLogin: {
    padding: 12,
    height: 50,
    width: width * 0.8,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    fontSize: 24,
  },
  buttonLogin2: {
    borderColor: "#fff",
    borderWidth: 2,
    borderStyle: "solid",
  },
  btnNoBg: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#fff",
  },
  btnBg: {
    backgroundColor: "#269355",
  },
  btnText: {
    fontSize: 18,
    fontWeight: 700,
    color: "white",
  },
  btnText2: {
    color: "white",
  },
});
