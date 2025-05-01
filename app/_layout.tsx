import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Redirect, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { ActivityIndicator, View } from "react-native";
import { RoleProvider } from "@/providers/RoleProvider";
import { AuthProvider, useAuthenticate } from "@/providers/AuthProvider";
import { RequestProvider } from "@/providers/RequestProvider";
import { ToastProvider } from "@/providers/ToastProvider";
import { ChatProvider } from "@/providers/AllChatsProvider";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    SplashScreen.preventAutoHideAsync();
    return null;
  }
  return (
    <ToastProvider>
      <ChatProvider>
        <RequestProvider>
          <RoleProvider>
            <AuthProvider>
              <View style={{ flex: 1 }}>
                <Stack
                  screenOptions={{
                    gestureEnabled: true,
                  }}
                  initialRouteName="index"
                >
                  <Stack.Screen
                    name="index"
                    options={{
                      headerShown: false,
                      animation: "slide_from_right",
                    }}
                  />
                  <Stack.Screen
                    name="(auth)"
                    options={{
                      headerShown: false,
                      animation: "slide_from_left",
                    }}
                  />
                  <Stack.Screen
                    name="(protected)"
                    options={{ headerShown: false }}
                  />
                  {/* <Stack.Screen name="(cars)" options={{ headerShown: false }} />
            <Stack.Screen name="(chats)" options={{ headerShown: false }} />
            <Stack.Screen name="(profile)" options={{ headerShown: false }} />
            <Stack.Screen
              name="(userProfile)"
              options={{ headerShown: false }}
            /> */}
                  <Stack.Screen name="+not-found" />
                </Stack>
                <StatusBar style={"auto"} hidden={false} />
              </View>
            </AuthProvider>
          </RoleProvider>
        </RequestProvider>
      </ChatProvider>
    </ToastProvider>
  );
}
