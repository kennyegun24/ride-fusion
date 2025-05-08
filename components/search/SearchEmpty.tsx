import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ThemedText } from "../ThemedText";
// const {height}
const SearchEmpty = () => {
  return (
    <View style={{ flex: 1 }}>
      <ThemedText style={{ margin: "auto", fontSize: 16 }}>
        No item found
      </ThemedText>
    </View>
  );
};

export default SearchEmpty;

const styles = StyleSheet.create({});
