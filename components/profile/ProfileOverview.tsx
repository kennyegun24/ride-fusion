import { StyleSheet, Text, View } from "react-native";
import React from "react";
import DynamicStarRating from "../Stars";
import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import { ThemedText } from "../ThemedText";

const ProfileOverview = ({ ratings, reviews, state, city }: any) => {
  return (
    <View>
      <ThemedText style={styles.overviewHeader}>Overview</ThemedText>

      <View style={styles.overviewRatingTextContainer}>
        <ThemedText>{ratings}</ThemedText>
        <DynamicStarRating fullColor="#F29D38" rating={ratings} size={14} />
        <ThemedText>{reviews} Reviews</ThemedText>
      </View>
      {/* <View style={styles.overviewTextView}>
        <Ionicons name="trophy-outline" size={18} color="#8B8B8B" />
        <ThemedText >143 Cars Rented Out</ThemedText>
      </View> */}
      <View style={styles.overviewTextView}>
        <MaterialIcons name="person-pin-circle" size={18} color="#8B8B8B" />
        <ThemedText>
          {city}, {state}
        </ThemedText>
      </View>
      <View style={styles.overviewTextView}>
        <FontAwesome6 name="user-shield" size={18} color="#8B8B8B" />
        <ThemedText>Verified</ThemedText>
      </View>
      <View style={styles.overviewTextView}>
        <FontAwesome6 name="clock-four" size={18} color="#8B8B8B" />
        <ThemedText>Member Since 2023</ThemedText>
      </View>
    </View>
  );
};

export default ProfileOverview;

const styles = StyleSheet.create({
  overviewHeader: { fontSize: 17, fontWeight: 600 },
  overviewRatingTextContainer: { flexDirection: "row", gap: 3, marginTop: 12 },
  overviewTextView: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  // overviewText: { color: "#8B8B8B" },
});
