import { usePreventBack } from "@/hooks/usePreventBack";
import { useRole } from "@/providers/RoleProvider";
import {
  EvilIcons,
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Redirect, Stack, Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  usePreventBack();
  const { role } = useRole();
  if (!role) {
    return <Redirect href={"/(auth)/login"} />;
  }
  return (
    // <View style={{ flex: 1, backgroundColor: "purple" }}>
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#269355",
        tabBarInactiveTintColor: "#8B8B8B",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="home-map-marker"
              size={28}
              color={color}
            />
          ),
        }}
      />
      {role === "owner" ? (
        <Tabs.Screen
          name="list-car"
          options={{
            title: "List Car",
            tabBarIcon: ({ color }) => (
              <FontAwesome name="car" size={24} color={color} />
            ),
          }}
        />
      ) : (
        <Tabs.Screen
          name="cars"
          options={{
            title: "Cars",
            tabBarIcon: ({ color }) => (
              <FontAwesome name="car" size={24} color={color} />
            ),
          }}
        />
      )}
      <Tabs.Screen
        name="(history)"
        options={{
          headerShown: false,
          title: "History",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="receipt" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(chats)"
        options={{
          // headerSearchBarOptions: {
          //   placeholder: "Search",
          // },
          // headerTransparent: true,
          headerShown: false,
          title: "Chats",
          tabBarIcon: ({ color }) => (
            <Ionicons name="chatbox-ellipses-outline" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <EvilIcons name="user" size={28} color={color} />
          ),
        }}
      />
      {role !== "owner" ? (
        <Tabs.Screen
          name="list-car"
          options={{
            href: null,
          }}
        />
      ) : (
        <Tabs.Screen
          name="cars"
          options={{
            href: null,
          }}
        />
      )}
    </Tabs>
    //   <StatusBar style="auto" />
    // </View>
  );
}
