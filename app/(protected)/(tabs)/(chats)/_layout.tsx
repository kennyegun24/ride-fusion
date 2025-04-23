import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
} from "@react-navigation/material-top-tabs";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";
import { withLayoutContext } from "expo-router";
import { Searchbar } from "react-native-paper";
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

export default function MyTabs() {
  const { top } = useSafeAreaInsets();
  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{ flex: 1, paddingHorizontal: 12, backgroundColor: "#fff" }}
      >
        <Searchbar
          value=""
          placeholder="Search chats"
          style={{
            backgroundColor: "#171C2208",
            borderColor: "#E9E9E9",
            borderWidth: 1,
            marginTop: top - 12,
          }}
        />
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
            name="all"
            options={{
              title: "All",
              sceneStyle: { backgroundColor: "#fff" },
            }}
          />
          <MaterialTopTabs.Screen
            name="unread"
            options={{
              title: "Unread",
              sceneStyle: { backgroundColor: "#fff" },
            }}
          />
        </MaterialTopTabs>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
