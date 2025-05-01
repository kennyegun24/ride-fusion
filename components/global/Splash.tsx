import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Image } from "react-native";
import { MotiView } from "moti";

const Splash = () => {
  return (
    <View style={{ height: "100%" }}>
      <View style={{ margin: "auto" }}>
        <Image
          style={{ width: 200, height: 100 }}
          source={require("@assets/images/splash-icon-light.png")}
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
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({});
