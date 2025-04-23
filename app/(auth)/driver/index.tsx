import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import TwinButtons from "@/components/TwinButtons";
import { router } from "expo-router";
const verify_image = require("@assets/images/verify.png");

const index = () => {
  const onPressFirst = () => router.navigate("/(protected)/(tabs)");
  const onPressSecond = () => router.navigate("/driver/verify-license");
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Let’s get your car earning.</Text>
      <Text style={styles.desc}>
        To keep the platform safe, we verify all car owners, the process takes
        just a few minutes.
      </Text>
      <Image style={styles.image} source={verify_image} />
      <TwinButtons
        first_text="Skip for Later"
        second_text="Start Verification"
        onPressFirst={onPressFirst}
        onPressSecond={onPressSecond}
      />
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 12,
  },
  header: { fontSize: 20, fontWeight: 600, color: "#414141" },
  desc: { fontSize: 14, color: "#8B8B8B", marginTop: 8 },
  image: {
    width: "80%",
    height: 300,
    objectFit: "contain",
    margin: "auto",
  },
});
