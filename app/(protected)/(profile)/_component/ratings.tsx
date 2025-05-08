import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Review from "@/components/home/details/Review";
import { cars } from "@/utils/cars";
import useSwr from "swr";
import axios from "axios";
const ReviewsComponent = () => {
  return (
    <View style={styles.usersRatingsContainer}>
      <Text style={styles.reviewTitle}>
        Reviews({cars[0].all_reviews?.length})
      </Text>
      {cars[0].all_reviews?.map((e, _) => (
        <Review key={_} data={e} />
      ))}
    </View>
  );
};

export default ReviewsComponent;

const styles = StyleSheet.create({
  usersRatingsContainer: {
    marginBottom: 16,
    gap: 16,
  },
  reviewTitle: { fontSize: 17, fontWeight: 600 },
});
