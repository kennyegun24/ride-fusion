import type { PropsWithChildren, ReactElement } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";

import { ThemedView } from "@/components/ThemedView";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Stack } from "expo-router";

const HEADER_HEIGHT = 250;

type Props = PropsWithChildren<{
  headerImage: ReactElement;
  headerBackgroundColor: { dark: string; light: string };
  bottom: number;
  header: ReactElement;
}>;

export default function ProfileScrollView({
  children,
  headerImage,
  headerBackgroundColor,
  bottom,
  header,
}: Props) {
  const colorScheme = useColorScheme() ?? "light";
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollOffset.value, [0, 250 / 1.5], [1, 0]),
    };
  });

  const stackHeaderAnimatedStyle = useAnimatedStyle(() => {
    const top = interpolate(
      scrollOffset.value,
      [0, 250 / 1.5],
      [-150, 0],
      Extrapolation.CLAMP
    );
    return {
      opacity: interpolate(scrollOffset.value, [0, 220 / 1], [0, 1]),
      top,
    };
  });

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTransparent: true,
          headerStyle: { backgroundColor: "" },
          // headerBackground()  { <Animated.View style={[styles.stackHeader]} /> }
          header: () => (
            <Animated.View
              style={[[styles.stackHeader, stackHeaderAnimatedStyle]]}
            >
              {header}
            </Animated.View>
          ),
        }}
      />
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        ref={scrollRef}
        scrollEventThrottle={16}
        scrollIndicatorInsets={{ bottom: bottom }}
        contentContainerStyle={{ paddingBottom: bottom }}
        style={{ flex: 1 }}
      >
        <Animated.View
          style={[
            styles.header,
            { backgroundColor: headerBackgroundColor[colorScheme] },
            headerAnimatedStyle,
          ]}
        >
          {headerImage}
        </Animated.View>
        <ThemedView style={styles.content}>{children}</ThemedView>
      </Animated.ScrollView>
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
  content: {
    flex: 1,
    padding: 12,
    gap: 16,
    overflow: "hidden",
  },
  stackHeader: {
    backgroundColor: "#269355",
    // height: 100,
    paddingHorizontal: 12,
    paddingBottom: 12,
    position: "fixed",
    width: "100%",
  },
});
