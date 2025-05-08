import SearchBar from "@/components/search/SearchBar";
import { ThemedView } from "@/components/ThemedView";
import { MaterialTopTabs } from "@/components/TopBarComponent";
import { useState } from "react";
import { useColorScheme } from "react-native";
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export default function MyTabs() {
  const { top } = useSafeAreaInsets();
  const [searchValue, setSearchValue] = useState<string>("");
  const theme = useColorScheme();
  const onSearchChange = async (e: string) => {
    setSearchValue(e);
  };
  return (
    <ThemedView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1, paddingHorizontal: 12 }}>
          <SearchBar
            searchValue={searchValue}
            onSearchChange={onSearchChange}
            top={top - 12}
          />
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
              name="all"
              options={{
                title: "All",
              }}
            />
            <MaterialTopTabs.Screen
              name="requests"
              options={{
                title: "Chat Requests",
                // sceneStyle: { backgroundColor: "#fff" },
              }}
            />
          </MaterialTopTabs>
        </SafeAreaView>
      </SafeAreaProvider>
    </ThemedView>
  );
}
