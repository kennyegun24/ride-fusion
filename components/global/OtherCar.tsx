import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { router } from "expo-router";
import { number_formatter } from "@/utils/formatter.helper";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";

const OtherCar = ({ details }: any) => {
  return (
    <ThemedView
      darkColor="#2F2F2F"
      border_d_color="#E0E0E040"
      border_l_color="#e9e9e9"
      style={styles.container}
    >
      <Pressable
        onPress={() => router.navigate(`/cars-pages/${details._id}`)}
        style={styles.carList}
      >
        <Image source={{ uri: details.images[0] }} style={styles.carImage} />
        <View style={styles.nameContainer}>
          <ThemedText style={styles.carName}>{details.car_name}</ThemedText>
          <ThemedText style={styles.price}>
            {number_formatter(details.rentalPricePerDay)}
          </ThemedText>
        </View>
      </Pressable>
    </ThemedView>
  );
};

export default OtherCar;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 12,
    overflow: "hidden",
  },
  carList: {
    width: 160,
    // borderWidth: 1,
  },
  carImage: { width: 160, height: 100 },
  nameContainer: {
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  carName: { fontSize: 15, lineHeight: 20 },
  price: {
    color: "#269355",
    fontSize: 15,
    fontWeight: 600,
    marginTop: 6,
    lineHeight: 21,
  },
});
