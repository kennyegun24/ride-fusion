import { AntDesign, EvilIcons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Pressable, Text, View } from "react-native";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#f4511e",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
      // initialRouteName="index"
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          headerStyle: { backgroundColor: "#fff" },
          animation: "slide_from_right",
          headerLeft: () => (
            <EvilIcons
              name="chevron-left"
              size={42}
              onPress={() => router.back()}
            />
          ),
        }}
      />
      <Stack.Screen
        name="change-password"
        options={{
          headerShadowVisible: false,
          headerStyle: { backgroundColor: "#fff" },
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
              <Text style={{ fontWeight: 500, fontSize: 16 }}>
                Change Password
              </Text>
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="support"
        options={{
          headerShadowVisible: false,
          headerStyle: { backgroundColor: "#fff" },
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
              <Text style={{ fontWeight: 500, fontSize: 16 }}>Support</Text>
            </Pressable>
          ),
        }}
      />
    </Stack>
  );
}
