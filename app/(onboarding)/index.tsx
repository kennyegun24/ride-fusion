// import { Image, StyleSheet, Platform } from "react-native";

// import { HelloWave } from "@/components/HelloWave";
// import ParallaxScrollView from "@/components/ParallaxScrollView";
// import { ThemedText } from "@/components/ThemedText";
// import { ThemedView } from "@/components/ThemedView";

// export default function HomeScreen() {
//   return (
//     <ParallaxScrollView
//       headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
//       headerImage={
//         <Image
//           source={require("@/assets/images/partial-react-logo.png")}
//           style={styles.reactLogo}
//         />
//       }
//     >
//       <ThemedView style={styles.titleContainer}>
//         <ThemedText type="title">Welcome!</ThemedText>
//         <HelloWave />
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <ThemedText type="subtitle">Step 1: Try it</ThemedText>
//         <ThemedText>
//           Edit{" "}
//           <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText>{" "}
//           to see changes. Press{" "}
//           <ThemedText type="defaultSemiBold">
//             {Platform.select({
//               ios: "cmd + d",
//               android: "cmd + m",
//               web: "F12",
//             })}
//           </ThemedText>{" "}
//           to open developer tools.
//         </ThemedText>
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <ThemedText type="subtitle">Step 2: Explore</ThemedText>
//         <ThemedText>
//           Tap the Explore tab to learn more about what's included in this
//           starter app.
//         </ThemedText>
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
//         <ThemedText>
//           When you're ready, run{" "}
//           <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText>{" "}
//           to get a fresh <ThemedText type="defaultSemiBold">app</ThemedText>{" "}
//           directory. This will move the current{" "}
//           <ThemedText type="defaultSemiBold">app</ThemedText> to{" "}
//           <ThemedText type="defaultSemiBold">app-example</ThemedText>.
//         </ThemedText>
//       </ThemedView>
//     </ParallaxScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   titleContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 8,
//   },
//   stepContainer: {
//     gap: 8,
//     marginBottom: 8,
//   },
//   reactLogo: {
//     height: 178,
//     width: 290,
//     bottom: 0,
//     left: 0,
//     position: "absolute",
//   },
// });

import { Alert, Dimensions, StyleSheet, View } from "react-native";
import React, { useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { onboardingData } from "@/components/animation/data/data";
import Circle from "@/components/animation/Circle";
import { SliderItem } from "@/components/animation/types";
import Backdrop from "@/components/animation/Backdrop";
import Indicator from "@/components/animation/Indicator";
import CircleButton from "@/components/animation/CircleButton";
import { router } from "expo-router";
import OnboardingItem from "@/components/animation/SlideerComponent";

const { width } = Dimensions.get("screen");

const index = () => {
  const scrollX = useSharedValue(0);
  const FlatListRef = useRef<Animated.FlatList<SliderItem>>(null);

  const [contentIndex, setContentIndex] = useState(0);

  const viewableItemsChanged = useRef(({ viewableItems }: any) => {
    setContentIndex(viewableItems[0].index);
  }).current;

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  const handleNext = () => {
    const currentIndex = Math.round(scrollX.value / width);
    if (currentIndex < onboardingData.length - 1) {
      FlatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      router.navigate("/(auth)/select-account-type");
    }
  };
  const login = () => {
    router.push("/(auth)/login");
  };
  return (
    <View style={styles.container}>
      <Backdrop scrollX={scrollX} />
      <StatusBar hidden />
      <Circle data={onboardingData} scrollX={scrollX} />
      <Animated.FlatList
        ref={FlatListRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        contentContainerStyle={styles.flatlistContainer}
        keyExtractor={(item) => item.key.toString()}
        onScroll={scrollHandler}
        data={onboardingData}
        renderItem={({ item, index }) => (
          <OnboardingItem index={index} item={item} scrollX={scrollX} />
        )}
        onViewableItemsChanged={viewableItemsChanged}
      />
      {contentIndex < onboardingData.length - 1 && (
        <Indicator data={onboardingData} scrollX={scrollX} />
      )}
      <CircleButton
        scrollX={scrollX}
        totalSize={contentIndex}
        onNext={handleNext}
        style={{
          right: 20,
          bottom: 20,
        }}
        canGoNext={contentIndex < onboardingData.length - 1}
        onlogin={login}
      />
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "yellow",
  },
  flatlistContainer: {
    paddingBottom: 100,
  },
});
