import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { FlashList } from "@shopify/flash-list";
import usePaginatedReviews, { Review } from "@/hooks/usePaginatedReviews";
import { useLocalSearchParams } from "expo-router";
import ReviewComponent, { ReviewProps } from "@/components/home/details/Review";
import { API_ROUTE } from "@/utils/apiRoute";
// import usePaginatedReviews, { Review } from "./usePaginatedReviews"; // Import the custom hook

const ReviewsList = ({ userID }: { userID: string }) => {
  const params = useLocalSearchParams();
  const { reviews, isLoading, isLoadingMore, isReachingEnd, loadMore } =
    usePaginatedReviews(
      `${API_ROUTE}review/get-reviews`,
      params.type as string,
      params?.id as string
    );

  // let reviews;
  // let isLoading;
  // let isLoadingMore;
  // let isReachingEnd = () => {};
  // let loadMore = () => {};

  // Render each review item
  const renderItem = ({ item }: { item: Review }) => (
    <View style={styles.item}>
      <ReviewComponent data={item} />
    </View>
  );

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="small" color="#0000ff" />
      ) : (
        <FlashList
          data={reviews}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          estimatedItemSize={100} // Approximate item height
          onEndReached={() => !isReachingEnd && loadMore()} // Load more reviews when reaching the end
          onEndReachedThreshold={0.1} // Trigger load more when 10% from the bottom
          ListFooterComponent={
            isLoadingMore ? (
              <ActivityIndicator size="small" color="#0000ff" />
            ) : null
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 20,
    paddingHorizontal: 10,
  },
  item: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginTop: 12,
    backgroundColor: "#f8f8f8",
    borderRadius: 5,
  },
});

export default ReviewsList;
