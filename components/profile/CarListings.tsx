import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import OtherCar from "../global/OtherCar";
import { router } from "expo-router";
import { ThemedText } from "../ThemedText";

type carsProps = {
  cars: {
    images: string[];
    car_name: string;
    rentalPricePerDay: number;
    _id: string;
  }[];
  hasMore: boolean;
  user: any;
};

const CarListings = ({ cars, hasMore, user }: carsProps) => {
  return (
    <View style={{ marginTop: 8 }}>
      <ThemedText style={styles.overviewHeader}>Car Listings</ThemedText>

      <ScrollView
        horizontal
        style={{ marginBottom: 18, marginTop: 12 }}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.scroll}>
          {cars.map((e, _) => (
            <OtherCar key={e._id} details={e} />
          ))}
          {hasMore && (
            <TouchableNativeFeedback
              onPressIn={() =>
                router.push({
                  pathname: "/(protected)/allCars",
                  params: {
                    id: user._id,
                    fullName: user.fullName,
                  },
                })
              }
            >
              <View style={styles.seeMore}>
                <Text style={{ fontWeight: 700 }}>See More</Text>
                <Entypo name="chevron-thin-right" size={16} color="black" />
              </View>
            </TouchableNativeFeedback>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default CarListings;

const styles = StyleSheet.create({
  overviewHeader: { fontSize: 17, fontWeight: 600 },
  scroll: { flexDirection: "row", gap: 12 },
  seeMore: {
    height: 85,
    width: 85,
    padding: 12,
    borderRadius: 75,
    backgroundColor: "#f4f4f4",
    elevation: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: "auto",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    flexDirection: "row",
    gap: 2,
    shadowRadius: 10,
  },
});
