import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";

const Filters = () => {
  const [filter, setFilter] = useState<string>("");
  const onClick = (e: string) => {
    setFilter(e);
    router.navigate({
      pathname: "/(protected)/searched-cars",
      params: { text: e },
    });
  };
  return (
    <View style={styles.container}>
      <ScrollView
        style={{ gap: 8 }}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.optionsContainer}>
          {options.map((e, _) => (
            <ThemedView
              darkColor={filter === e ? "#269355" : "#2F2F2F"}
              lightColor={filter === e ? "#269355" : "#171C2208"}
              border_d_color="#E0E0E040"
              border_l_color="#e9e9e9"
              key={_}
              style={styles.btn}
            >
              <Pressable onPress={() => onClick(e)}>
                <ThemedText
                  style={[styles.btnText, {}]}
                  darkColor={filter === e ? "#fff" : "#fff"}
                  lightColor={filter === e ? "#fff" : "#000"}
                >
                  {e}
                </ThemedText>
              </Pressable>
            </ThemedView>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Filters;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
  },
  optionsContainer: {
    flexDirection: "row",
    gap: 9,
  },
  btn: {
    padding: 6,
    paddingHorizontal: 12,
    minWidth: 80,
    borderRadius: 50,
  },
  btnText: {
    textAlign: "center",
    fontSize: 13,
  },
});

const options = [
  "All",
  "Ford",
  "Audi",
  "BMW",
  "Honda",
  "Hyundai",
  "Chevrolet",
  "Lexus",
  "Bugatti",
  "Ferrari",
];
