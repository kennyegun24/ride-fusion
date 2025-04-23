import { Image, Platform, StyleSheet, Text, View } from "react-native";
import React from "react";
import { EvilIcons } from "@expo/vector-icons";

const Header = () => {
  return (
    <View style={styles.container}>
      <View style={styles.flexGapRow}>
        <Image
          source={require("@/assets/images/male.jpeg")}
          style={styles.img}
        />
        <View style={{}}>
          <Text style={styles.header}>Welcome back</Text>
          <Text style={styles.name}>Kenny Elias</Text>
        </View>
      </View>
      <View style={styles.flexGapRow}>
        <View style={styles.iconContainer}>
          <EvilIcons
            style={styles.icon}
            name="location"
            size={24}
            color="#269355"
          />
        </View>
        <View style={styles.iconContainer}>
          <EvilIcons
            style={styles.icon}
            name="bell"
            size={32}
            color="#269355"
          />
        </View>
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
    fontSize: Platform.OS === "android" ? 18 : 21,
    fontWeight: Platform.OS === "android" ? 400 : 500,
  },
  iconContainer: {
    // elevation: 2,
    backgroundColor: "#E0E0E069",
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
