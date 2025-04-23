import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

const Filters = () => {
  const [filter, setFilter] = useState<string>("");
  return (
    <View style={styles.container}>
      <ScrollView
        style={{ gap: 8 }}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.optionsContainer}>
          {options.map((e, _) => (
            <Pressable
              key={_}
              onPress={() => setFilter(e)}
              style={[
                styles.btn,
                {
                  backgroundColor: filter === e ? "#269355" : "#171C2208",
                  borderColor: filter === e ? "#269355" : "#E9E9E9",
                  borderWidth: 1,
                },
              ]}
            >
              <Text
                style={[
                  styles.btnText,
                  { color: filter === e ? "#fff" : "#000" },
                ]}
              >
                {e}
              </Text>
            </Pressable>
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
    fontSize: 18,
    color: "#fff",
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
