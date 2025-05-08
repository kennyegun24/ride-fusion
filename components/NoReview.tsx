import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ThemedText } from "./ThemedText";

const NoReview = () => {
  return (
    <View style={{ height: 100 }}>
      <ThemedText darkColor="#f4f4f4" style={{ margin: "auto" }}>
        No Review found
      </ThemedText>
    </View>
  );
};

export default NoReview;

const styles = StyleSheet.create({});
