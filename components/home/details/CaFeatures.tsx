import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { Octicons } from "@expo/vector-icons";

interface CarFeatureProps {
  details: string[];
}

const CaFeatures: FC<CarFeatureProps> = ({ details }) => {
  return (
    <View style={{ marginVertical: 18 }}>
      <ScrollView
        // style={{ marginVertical: 24 }}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.scrollContainer}>
          {details?.map((e, _) => (
            <Text key={_} style={styles.btnText}>
              {e}
            </Text>
          ))}
        </View>
      </ScrollView>
      <View style={styles.featuresContainer}>
        <Text style={styles.featuresHeader}>Car Features</Text>
        <View style={styles.featuresMap}>
          {details?.map((e, _) => (
            <Text key={_} style={styles.featureText}>
              <Octicons name="dot-fill" size={16} color="#269355" />
              {e}
            </Text>
          ))}
        </View>
      </View>
    </View>
  );
};

export default CaFeatures;

const styles = StyleSheet.create({
  scrollContainer: { flexDirection: "row", gap: 6 },
  btnText: {
    color: "#269355",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#269355",
    backgroundColor: "#2693550D",
  },
  featuresContainer: { marginTop: 16, gap: 12 },
  featuresHeader: { color: "#414141", fontSize: 18 },
  featuresMap: {
    flexDirection: "row",
    gap: 18,
    flexWrap: "wrap",
    paddingVertical: 24,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#E9E9E9",
    backgroundColor: "#171C2208",
    borderRadius: 12,
  },
  featureText: {
    color: "#414141",
    fontSize: 16,
    gap: 8,
    flexDirection: "row",
  },
});
