import { usePreventBack } from "@/hooks/usePreventBack";
import { EvilIcons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Pressable, Text, View } from "react-native";
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
          name="index"
          options={{
            headerStyle: { backgroundColor: "#fff" },
            headerShadowVisible: false,
            animation: "slide_from_right",
            headerLeft: () => (
              <Text style={{ fontWeight: 500, fontSize: 16 }}>
                Verify Account
              </Text>
            ),
          }}
        />
        <Stack.Screen
          name="verify-license"
          options={{
            headerStyle: { backgroundColor: "#fff" },
            headerShadowVisible: false,
            animation: "slide_from_right",
            headerLeft: () => (
              <Pressable
                style={{
                  borderRadius: 50,
                  flexDirection: "row",
                  alignItems: "center",
                }}
                onPress={() => router.back()}
              >
                <EvilIcons name="chevron-left" size={42} />
                <Text style={{ fontWeight: 500, fontSize: 16 }}>Back</Text>
              </Pressable>
            ),
          }}
        />
        <Stack.Screen
          name="id-passport"
          options={{
            headerStyle: { backgroundColor: "#fff" },
            headerShadowVisible: false,
            animation: "slide_from_right",
            headerLeft: () => (
              <Pressable
                style={{
                  borderRadius: 50,
                  flexDirection: "row",
                  alignItems: "center",
                }}
                onPress={() => router.back()}
              >
                <EvilIcons name="chevron-left" size={42} />
                <Text style={{ fontWeight: 500, fontSize: 16 }}>Back</Text>
              </Pressable>
            ),
          }}
        />
        <Stack.Screen
          name="e-hailing"
          options={{
            headerStyle: { backgroundColor: "#fff" },
            headerShadowVisible: false,
            animation: "slide_from_right",
            headerLeft: () => (
              <Pressable
                style={{
                  borderRadius: 50,
                  flexDirection: "row",
                  alignItems: "center",
                }}
                onPress={() => router.back()}
              >
                <EvilIcons name="chevron-left" size={42} />
                <Text style={{ fontWeight: 500, fontSize: 16 }}>Back</Text>
              </Pressable>
            ),
          }}
        />
      </Stack>
      <StatusBar style="auto" />
    </View>
    // {/* </GestureHandlerRootView> */}
    // </SafeAreaProvider>
  );
}
