import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Redirect, router, Stack, useFocusEffect } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { View } from "react-native";
import { usePreventBack } from "@/hooks/usePreventBack";
import { useCallback } from "react";
import { getAuth } from "firebase/auth";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  usePreventBack();
  useFocusEffect(
    useCallback(() => {
      const unsubscribe = getAuth().onAuthStateChanged((user) => {
        if (!user) {
          router.push("/(auth)/select-account-type");
        }
      });
      unsubscribe;

      return unsubscribe;
    }, [])
  );

  // if (!isAuthenticated) {
  //   return <Redirect href={"/(auth)/login"} />;
  // }

  return (
    <View style={{ flex: 1 }}>
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
          name="(cars)"
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
      </Stack>
      <StatusBar style={"auto"} hidden={false} />
    </View>
  );
}
