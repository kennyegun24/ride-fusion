import { StyleSheet, Text, View } from "react-native";
import React from "react";
import DynamicStarRating from "../Stars";
import { FontAwesome6, Ionicons, MaterialIcons } from "@expo/vector-icons";

const ProfileOverview = () => {
  return (
    <View>
      <Text style={styles.overviewHeader}>Overview</Text>

      <View style={styles.overviewRatingTextContainer}>
        <Text style={styles.overviewText}>4.9</Text>
        <DynamicStarRating fullColor="#F29D38" rating={4.7} size={14} />
        <Text style={styles.overviewText}>23 Reviews</Text>
      </View>
      <View style={styles.overviewTextView}>
        <Ionicons name="trophy-outline" size={18} color="#8B8B8B" />
        <Text style={styles.overviewText}>143 Cars Rented Out</Text>
      </View>
      <View style={styles.overviewTextView}>
        <MaterialIcons name="person-pin-circle" size={18} color="#8B8B8B" />
        <Text style={styles.overviewText}>Ikeja, Lagos</Text>
      </View>
      <View style={styles.overviewTextView}>
        <FontAwesome6 name="user-shield" size={18} color="#8B8B8B" />
        <Text style={styles.overviewText}>Verified</Text>
      </View>
      <View style={styles.overviewTextView}>
        <FontAwesome6 name="clock-four" size={18} color="#8B8B8B" />
        <Text style={styles.overviewText}>Member Since 2023</Text>
      </View>
    </View>
  );
};

export default ProfileOverview;

const styles = StyleSheet.create({
  overviewHeader: { fontSize: 20, fontWeight: 600 },
  overviewRatingTextContainer: { flexDirection: "row", gap: 3, marginTop: 12 },
  overviewTextView: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  overviewText: { color: "#8B8B8B" },
});
