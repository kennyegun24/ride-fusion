import { Image, Platform, StyleSheet, Text, View } from "react-native";
import React from "react";
import { EvilIcons } from "@expo/vector-icons";
import useAuth from "@/hooks/userAuth";
import useNotifications from "@/hooks/useNotifications";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";

const Header = () => {
  const { user } = useAuth();
  const { notifications } = useNotifications();

  return (
    <View style={styles.container}>
      <View style={styles.flexGapRow}>
        <Image
          source={
            user?.photoURL
              ? { uri: user?.photoURL }
              : require("@/assets/images/no_image.png")
          }
          style={styles.img}
        />
        <View style={{}}>
          <Text style={styles.header}>Welcome back</Text>
          <ThemedText style={styles.name}>{user?.displayName}</ThemedText>
        </View>
      </View>
      <View style={styles.flexGapRow}>
        <ThemedView
          border_l_color="#E0E0E069"
          border_d_color="#E0E0E040"
          lightColor="#E0E0E069"
          style={styles.iconContainer}
        >
          <EvilIcons
            style={styles.icon}
            name="location"
            size={24}
            color="#269355"
          />
        </ThemedView>
        <ThemedView
          border_l_color="#E0E0E069"
          border_d_color="#E0E0E040"
          lightColor="#E0E0E069"
          style={styles.iconContainer}
        >
          <EvilIcons
            style={styles.icon}
            name="bell"
            size={32}
            color="#269355"
          />
          <Text
            style={{
              position: "absolute",
              right: -5,
              top: -5,
              backgroundColor: "#269355",
              padding: 4,
              height: 20,
              width: 20,
              fontSize: 12,
              textAlign: "center",
              color: "#fff",
              fontWeight: 700,
              borderRadius: 50,
            }}
          >
            {notifications.length}
          </Text>
        </ThemedView>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  flexGapRow: { flexDirection: "row", gap: 8, alignItems: "center" },
  img: { height: 50, width: 50, borderRadius: 50 },
  header: { fontSize: 14, color: "#8B8B8B", fontWeight: 300 },
  name: {
    fontSize: 17,
    fontWeight: 500,
  },
  iconContainer: {
    // elevation: 2,
    // backgroundColor: "#E0E0E069",
    borderWidth: 1,
    borderRadius: 50,
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    ...(Platform.OS === "android" && {
      transform: [{ scale: 0.8 }],
    }),
  },
});
