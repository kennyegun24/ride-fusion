import { auth } from "@/firebase";
import { usePreventBack } from "@/hooks/usePreventBack";
import { useRegistrationState } from "@/hooks/useRegisterationState";
import { router, Stack, useFocusEffect } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { getAuth } from "firebase/auth";
import { useCallback, useEffect } from "react";
import { View } from "react-native";

export default function RootLayout() {
  const registrationComplete = useRegistrationState(
    (state) => state.registrationComplete
  );

  usePreventBack();
  useFocusEffect(
    useCallback(() => {
      const unsubscribe = getAuth().onAuthStateChanged((user) => {
        if (user && registrationComplete) {
          router.push("/(protected)/(tabs)");
        }
      });
      unsubscribe;

      return unsubscribe;
    }, [registrationComplete])
  );
  return (
    // <SafeAreaProvider style={{ backgroundColor: "white", flex: 1 }}>
    <View style={{ flex: 1, backgroundColor: "purple" }}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          gestureEnabled: true,
          // animation: "slide_from_left",
          // presentation: "modal",
        }}
      >
        <Stack.Screen
          name="select-account-type"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="index"
          options={{ headerShown: false, animation: "slide_from_right" }}
        />
        <Stack.Screen
          name="signup-driver"
          options={{ headerShown: false, animation: "slide_from_right" }}
        />
        <Stack.Screen
          name="signup-owner"
          options={{ headerShown: false, animation: "slide_from_left" }}
        />
        <Stack.Screen
          name="driver"
          options={{ headerShown: false, animation: "slide_from_left" }}
        />
      </Stack>
      <StatusBar style="auto" />
    </View>
    // {/* </GestureHandlerRootView> */}
    // </SafeAreaProvider>
  );
}
