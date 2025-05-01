import {
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { FC } from "react";
import { CarObjProps } from "@/types/carTypes";
import { router } from "expo-router";

const Car: FC<CarObjProps> = ({
  images,
  car_name,
  model,
  downloadURL: owner_image,
  fullName: owner_name,
  rentalPricePerDay,
  available,
  _id,
}) => {
  return (
    <Pressable
      style={styles.container}
      onPress={() => [router.navigate(`/(protected)/(cars)/${_id}`)]}
    >
      <Image source={{ uri: images[0] }} style={styles.carImg} />
      <View style={styles.subContainer}>
        <View>
          <Text style={styles.carName}>
            {car_name} {model}
          </Text>
          <Text style={styles.status}>
            {available ? "Available Now" : "Unavailable"}
          </Text>
        </View>
        <Text style={styles.amount}>${rentalPricePerDay}/day</Text>
      </View>

      <View style={styles.cardDetails}>
        <View style={styles.ownerDetails}>
          <Image source={{ uri: owner_image }} style={styles.img} />
          <Text style={styles.name}>{owner_name}</Text>
        </View>
        <Pressable
          // onPress={() => setFilter(e)}
          style={styles.btn}
        >
          <Text style={styles.btnText}>Rent Now</Text>
        </Pressable>
      </View>
    </Pressable>
  );
};

export default Car;

const styles = StyleSheet.create({
  container: {
    borderRadius: 30,
    overflow: "hidden",
    backgroundColor: "#171C2208",
    borderWidth: 1,
    borderColor: "#E9E9E9",
  },
  carImg: { height: 180, width: "100%", resizeMode: "cover" },
  subContainer: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 18,
    justifyContent: "space-between",
  },
  carName: { fontSize: 16, color: "#414141", fontWeight: 600 },
  status: { fontSize: 14, marginTop: 2, color: "#8B8B8B" },
  amount: { fontSize: 16, color: "#414141" },
  cardDetails: {
    padding: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ownerDetails: { flexDirection: "row", gap: 6, alignItems: "center" },
  img: { height: 35, width: 35, borderRadius: 50 },
  name: {
    fontSize: 16,
    fontWeight: Platform.OS === "android" ? 400 : 500,
  },
  btn: {
    padding: 6,
    paddingHorizontal: 14,
    minWidth: 80,
    borderRadius: 50,
    backgroundColor: "#269355",
  },
  btnText: {
    textAlign: "center",
    fontSize: 14,
    color: "#fff",
  },
});
