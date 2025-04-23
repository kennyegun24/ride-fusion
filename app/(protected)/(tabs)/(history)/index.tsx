import { ScrollView, StyleSheet } from "react-native";
import React from "react";
import { completedRentals } from "@/utils/history";
import HistoryCard from "@/components/history/HistoryCard";

const index = () => {
  return (
    <ScrollView style={styles.container}>
      {completedRentals.map((e, _) => (
        <HistoryCard key={_} data={e} />
      ))}
    </ScrollView>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    padding: 12,
    paddingVertical: 24,
  },
});
