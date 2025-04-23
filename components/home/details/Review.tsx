import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import DynamicStarRating from "@/components/Stars";
import { CarObjProps } from "@/types/carTypes";

interface ReviewProps {
  data: {
    reviewer_name: string;
    review: number;
    review_date: string;
    review_text: string;
  };
}
const Review: FC<ReviewProps> = ({ data }) => {
  return (
    <View style={styles.usersRating}>
      <Text style={styles.userRatingName}>{data.reviewer_name}</Text>
      <View style={styles.userRatingViewContainer}>
        <DynamicStarRating rating={data.review} fullColor="#D9B100" size={14} />
        <Text style={styles.ratingDate}>{data.review_date}</Text>
      </View>
      <Text style={styles.ratingDesc}>{data.review_text}</Text>
    </View>
  );
};

export default Review;

const styles = StyleSheet.create({
  usersRating: {
    borderBottomColor: "#E9E9E9",
    borderBottomWidth: 1,
    paddingBottom: 8,
  },
  userRatingName: { fontSize: 18, color: "#242425", marginBottom: 6 },
  userRatingViewContainer: { flexDirection: "row", gap: 2 },
  ratingDate: { fontSize: 14, color: "#8B8B8B" },
  ratingDesc: { marginTop: 12, color: "#8b8b8b", fontSize: 16, lineHeight: 24 },
});
