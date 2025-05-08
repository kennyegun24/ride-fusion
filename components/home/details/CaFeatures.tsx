import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { Octicons } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";

interface CarFeatureProps {
  details: any;
}

const CaFeatures: FC<CarFeatureProps> = ({ details }) => {
  return (
    <View style={{ marginBottom: 18, marginTop: 12 }}>
      <ThemedText style={styles.featuresHeader}>Car Features</ThemedText>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.scrollContainer}>
          <Text style={styles.btnText}>{details.seats} seats</Text>
          <Text style={styles.btnText}>{details.transmission}</Text>
          <Text style={styles.btnText}>{details.fuelType}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default CaFeatures;

const styles = StyleSheet.create({
  scrollContainer: { flexDirection: "row", gap: 6 },
  btnText: {
    color: "#269355",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#269355",
    backgroundColor: "#2693550D",
    fontSize: 12,
  },
  featuresHeader: { fontSize: 17, marginBottom: 6 },
});
