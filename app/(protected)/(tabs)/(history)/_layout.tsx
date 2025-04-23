import { MaterialTopTabs } from "@/components/TopBarComponent";
import { SafeAreaView } from "react-native";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export default function MyTabs() {
  const { top } = useSafeAreaInsets();
  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{ flex: 1, paddingHorizontal: 12, backgroundColor: "#fff" }}
      >
        <MaterialTopTabs
          screenOptions={{
            tabBarActiveTintColor: "#000",
            tabBarLabelStyle: {
              fontSize: 14,
              fontWeight: "bold",
              textTransform: "capitalize",
            },
            tabBarIndicatorStyle: { backgroundColor: "#269355", height: 2 },
          }}
        >
          <MaterialTopTabs.Screen
            name="pending"
            options={{
              title: "Pending",
              sceneStyle: { backgroundColor: "#fff" },
            }}
          />
          <MaterialTopTabs.Screen
            name="progress"
            options={{
              title: "In Progress",
              sceneStyle: { backgroundColor: "#fff" },
            }}
          />
          <MaterialTopTabs.Screen
            name="index"
            options={{
              title: "Completed",
              sceneStyle: { backgroundColor: "#fff" },
            }}
          />
        </MaterialTopTabs>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
