import { ThemedView } from "@/components/ThemedView";
import { MaterialTopTabs } from "@/components/TopBarComponent";
import { SafeAreaView, useColorScheme } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function MyTabs() {
  const theme = useColorScheme();
  return (
    <ThemedView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1, paddingHorizontal: 12 }}>
          <MaterialTopTabs
            screenOptions={{
              tabBarActiveTintColor: theme === "light" ? "#000" : "#fff",
              tabBarInactiveTintColor: theme === "light" ? "#111" : "#a1a1a1",
              tabBarStyle: { backgroundColor: "transparent" },
              tabBarLabelStyle: {
                fontSize: 14,
                fontWeight: "bold",
                textTransform: "capitalize",
              },
              sceneStyle: {
                backgroundColor: "transparent",
              },
              tabBarIndicatorStyle: { backgroundColor: "#269355", height: 2 },
            }}
          >
            <MaterialTopTabs.Screen
              name="progress"
              options={{
                title: "In Progress",
                // sceneStyle: { backgroundColor: "#fff" },
              }}
            />
            <MaterialTopTabs.Screen
              name="index"
              options={{
                title: "Approved",
              }}
            />
          </MaterialTopTabs>
        </SafeAreaView>
      </SafeAreaProvider>
    </ThemedView>
  );
}
