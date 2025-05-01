import { router, Stack } from "expo-router";

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
        }}
      />
      <Stack.Screen
        name="availability"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="documentation"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
