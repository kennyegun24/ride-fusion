import { ThemedText } from "@/components/ThemedText";
import { AntDesign, EvilIcons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Pressable, Text, useColorScheme, View } from "react-native";

export default function RootLayout() {
  const theme = useColorScheme();
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          // backgroundColor: "#f4511e",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerTitle: "",
      }}
      // initialRouteName="index"
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: theme === "light" ? "#fff" : "#282828",
          },
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
          headerStyle: {
            backgroundColor: theme === "light" ? "#fff" : "#282828",
          },
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
              <EvilIcons
                color={theme === "light" ? "#000" : "#fff"}
                name="chevron-left"
                size={24}
              />
              <ThemedText style={{ fontWeight: 500, fontSize: 16 }}>
                Change Password
              </ThemedText>
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="support"
        options={{
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: theme === "light" ? "#fff" : "#282828",
          },
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
              <EvilIcons
                color={theme === "light" ? "#000" : "#fff"}
                name="chevron-left"
                size={24}
              />
              <ThemedText style={{ fontWeight: 500, fontSize: 16 }}>
                Support
              </ThemedText>
            </Pressable>
          ),
        }}
      />
    </Stack>
  );
}
