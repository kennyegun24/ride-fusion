import type { PropsWithChildren, ReactElement } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { FlashList } from "@shopify/flash-list";
import { ThemedView } from "@/components/ThemedView";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Stack } from "expo-router";

const HEADER_HEIGHT = 250;

type Props = PropsWithChildren<{
  headerImage: ReactElement;
  headerBackgroundColor: { dark: string; light: string };
  bottom: number;
  header: ReactElement;
  data: any[]; // Consider typing this (e.g., Message[] from ChatScreen)
  renderItem: ({ item, index }: { item: any; index: number }) => ReactElement;
  onScroll?: (event: any) => void; // Optional: for external scroll handling
  scrollEventThrottle?: number; // Optional: control scroll event frequency
}>;

export default function ProfileScrollView({
  headerImage,
  headerBackgroundColor,
  bottom,
  header,
  data,
  renderItem,
  onScroll,
  scrollEventThrottle = 16,
}: Props) {
  const colorScheme = useColorScheme() ?? "light";

  // Shared value for scroll position
  const scrollY = useSharedValue(0);

  // Handle scroll events for animation and external onScroll
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
      if (onScroll) {
        onScroll(event);
      }
    },
  });

  // Header animation (parallax effect)
  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollY.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75],
            Extrapolation.CLAMP
          ),
        },
        {
          scale: interpolate(
            scrollY.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [1.5, 1, 1],
            Extrapolation.CLAMP
          ),
        },
      ],
      opacity: interpolate(
        scrollY.value,
        [0, HEADER_HEIGHT / 2],
        [1, 0.8],
        Extrapolation.CLAMP
      ),
    };
  });

  // Stack header animation
  const stackHeaderAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollY.value,
            [0, HEADER_HEIGHT / 1.5],
            [-HEADER_HEIGHT / 2, 0],
            Extrapolation.CLAMP
          ),
        },
      ],
      opacity: interpolate(
        scrollY.value,
        [0, HEADER_HEIGHT / 2],
        [0, 1],
        Extrapolation.CLAMP
      ),
    };
  });

  // Animated FlashList
  const AnimatedFlashList = Animated.createAnimatedComponent(FlashList<any>);

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTransparent: true,
          headerStyle: { backgroundColor: "transparent" },
          header: () => (
            <Animated.View
              style={[styles.stackHeader, stackHeaderAnimatedStyle]}
            >
              {header}
            </Animated.View>
          ),
        }}
      />
      <AnimatedFlashList
        data={data}
        renderItem={renderItem}
        onScroll={scrollHandler}
        scrollEventThrottle={scrollEventThrottle}
        scrollIndicatorInsets={{ bottom }}
        ListHeaderComponent={
          <Animated.View
            style={[
              styles.header,
              { backgroundColor: headerBackgroundColor[colorScheme] },
              headerAnimatedStyle,
            ]}
          >
            {headerImage}
          </Animated.View>
        }
        contentContainerStyle={{
          paddingBottom: bottom,
        }}
        showsVerticalScrollIndicator={false}
        estimatedItemSize={70} // Adjust based on your item height
        disableAutoLayout // Improve rendering stability
        style={{ flex: 1 }}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  header: {
    height: HEADER_HEIGHT,
    overflow: "hidden",
  },
  stackHeader: {
    position: "absolute",
    left: 0,
    right: 0,
    backgroundColor: "#269355",
    paddingHorizontal: 12,
    paddingBottom: 12,
    zIndex: 10, // Ensure stack header is above content
  },
});
