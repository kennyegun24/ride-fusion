import {
  ActivityIndicator,
  Alert,
  Dimensions,
  StyleSheet,
  View,
} from "react-native";
import React, { useCallback, useRef, useState } from "react";
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
import { router, useFocusEffect } from "expo-router";
import OnboardingItem from "@/components/animation/SlideerComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useAuth from "@/hooks/userAuth";
import Splash from "@/components/global/Splash";
import { useRegistrationState } from "@/hooks/useRegisterationState";

const { width } = Dimensions.get("screen");

const index = () => {
  const [isChecking, setIsChecking] = useState({
    checking: true,
    onboarding: false,
  });
  const { user } = useAuth();
  const getUserOnboardingStats = async () => {
    try {
      const getStat =
        (await AsyncStorage.getItem("ride-fusion-onboarding-screen")) || false;
      if (getStat) {
        setIsChecking((prev) => ({
          checking: false,
          onboarding: true,
        }));
        if (user) {
          useRegistrationState.getState().setRegistrationComplete(true);
          // return router.navigate("/(auth)/select-account-type");
          return router.navigate("/(protected)/(tabs)");
        }
        useRegistrationState.getState().setRegistrationComplete(false);
        router.navigate("/(auth)/select-account-type");
        return;
      }
      setIsChecking((prev) => ({
        checking: false,
        onboarding: false,
      }));
    } catch (error) {
      setIsChecking((prev) => ({
        checking: false,
        onboarding: false,
      }));
    }
  };
  useFocusEffect(
    useCallback(() => {
      getUserOnboardingStats();
    }, [])
  );
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

  const handleNext = async () => {
    const currentIndex = Math.round(scrollX.value / width);
    if (currentIndex < onboardingData.length - 1) {
      FlatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      await AsyncStorage.setItem("ride-fusion-onboarding-screen", "true");
      router.navigate("/(auth)/select-account-type");
    }
  };
  const login = async () => {
    await AsyncStorage.setItem("ride-fusion-onboarding-screen", "true");
    router.push("/(auth)/login");
  };
  if (isChecking.checking || isChecking.onboarding) {
    return <Splash />;
  }
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
