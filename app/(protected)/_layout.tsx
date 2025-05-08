import { Redirect, router, Stack, useFocusEffect } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { usePreventBack } from "@/hooks/usePreventBack";
import { useCallback, useState } from "react";
import { getAuth } from "firebase/auth";
import { ThemedView } from "@/components/ThemedView";
import { usePresence } from "@/hooks/usePresence";
import { usePushNotifications } from "@/hooks/usePushNotifications";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [userId, setUserId] = useState<string | null>(null);
  usePresence(userId);
  usePushNotifications(userId);
  usePreventBack();
  useFocusEffect(
    useCallback(() => {
      const unsubscribe = getAuth().onAuthStateChanged((user) => {
        if (!user) {
          return router.push("/(auth)/select-account-type");
        }
        setUserId(user.uid);
      });
      unsubscribe;

      return unsubscribe;
    }, [])
  );

  // if (!isAuthenticated) {
  //   return <Redirect href={"/(auth)/login"} />;
  // }

  return (
    <ThemedView style={{ flex: 1 }}>
      <StatusBar hidden={false} style="auto" />
      <Stack
        screenOptions={{
          gestureEnabled: true,
        }}
        initialRouteName="(tabs)"
      >
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false, animation: "slide_from_right" }}
        />
        <Stack.Screen
          name="cars-pages"
          options={{ headerShown: false, animation: "slide_from_right" }}
        />
        <Stack.Screen
          name="chats"
          options={{ headerShown: false, animation: "slide_from_right" }}
        />
        <Stack.Screen
          name="(profile)"
          options={{ headerShown: false, animation: "slide_from_right" }}
        />
        <Stack.Screen
          name="(userProfile)"
          options={{ headerShown: false, animation: "slide_from_right" }}
        />
        <Stack.Screen
          name="allReviews"
          options={{
            headerTitle: "Reviews",
            animation: "slide_from_right",
            headerBackButtonDisplayMode: "minimal",
          }}
        />
        <Stack.Screen
          name="allCars"
          options={{
            headerTitle: "Cars",
            animation: "slide_from_right",
            headerBackButtonDisplayMode: "minimal",
          }}
        />
        <Stack.Screen
          name="searched-cars"
          options={{
            headerShown: false,
            headerTitle: "Search",
            animation: "slide_from_right",
            headerBackButtonDisplayMode: "minimal",
          }}
        />
      </Stack>
      <StatusBar style={"auto"} hidden={false} />
    </ThemedView>
  );
}
