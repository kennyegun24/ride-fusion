import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import DynamicStarRating from "@/components/Stars";
import { CarObjProps } from "@/types/carTypes";
import { date_formatter } from "@/utils/formatter.helper";

export interface ReviewProps {
  data: {
    comment: string;
    createdAt: string;
    rating: number;
    user: {
      fullName: string;
    };
  };
}
const Review: FC<ReviewProps> = ({ data }) => {
  return (
    <View style={styles.usersRating}>
      <Text style={styles.userRatingName}>{data.user.fullName}</Text>
      <View style={styles.userRatingViewContainer}>
        <DynamicStarRating rating={data.rating} fullColor="#D9B100" size={14} />
        <Text style={styles.ratingDate}>{date_formatter(data.createdAt)}</Text>
      </View>
      <Text style={styles.ratingDesc}>{data.comment}</Text>
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
  userRatingName: { fontSize: 15, color: "#242425", marginBottom: 6 },
  userRatingViewContainer: { flexDirection: "row", gap: 2 },
  ratingDate: { fontSize: 13, color: "#8B8B8B" },
  ratingDesc: { marginTop: 12, color: "#8b8b8b", fontSize: 14, lineHeight: 22 },
});
