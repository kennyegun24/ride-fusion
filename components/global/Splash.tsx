import { StyleSheet, Text, useColorScheme, View } from "react-native";
import React from "react";
import { Image } from "react-native";
import { MotiView } from "moti";
import { ThemedView } from "../ThemedView";

const Splash = () => {
  const theme = useColorScheme();
  return (
    <ThemedView style={{ height: "100%", flex: 1 }}>
      <View style={{ margin: "auto" }}>
        <Image
          style={{ width: 200, height: 100 }}
          source={
            theme === "dark"
              ? require("@assets/images/icons/splash-icon-dark.png")
              : require("@assets/images/icons/splash-icon-light.png")
          }
        />
        <View style={{ flexDirection: "row", gap: 1, margin: "auto" }}>
          {[0, 1, 2].map((index) => (
            <MotiView
              from={{ opacity: 0.3, translateY: 0 }}
              animate={{ opacity: 1, translateY: -7 }}
              transition={{
                type: "timing",
                duration: 500,
                delay: index * 300,
                loop: true,
                repeatReverse: true,
              }}
              key={index}
              style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: "#3498db",
                marginHorizontal: 2,
              }}
            />
          ))}
        </View>
      </View>
    </ThemedView>
  );
};

export default Splash;

const styles = StyleSheet.create({});
