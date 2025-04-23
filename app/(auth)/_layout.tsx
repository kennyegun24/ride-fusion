import { usePreventBack } from "@/hooks/usePreventBack";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  usePreventBack();
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
          name="login"
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
