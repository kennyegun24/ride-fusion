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
  car_image,
  car_name,
  car_year,
  owner_image,
  owner_name,
  rent_amount,
}) => {
  return (
    <Pressable
      style={styles.container}
      onPress={() => router.navigate(`/(protected)/(cars)/${car_name}`)}
    >
      <Image source={car_image[0]} style={styles.carImg} />
      <View style={styles.subContainer}>
        <View>
          <Text style={styles.carName}>
            {car_name} {car_year}
          </Text>
          <Text style={styles.status}>Available Now</Text>
        </View>
        <Text style={styles.amount}>${rent_amount}</Text>
      </View>

      <View style={styles.cardDetails}>
        <View style={styles.ownerDetails}>
          <Image source={owner_image} style={styles.img} />
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
  carImg: { height: 200, width: "100%", resizeMode: "cover" },
  subContainer: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 18,
    justifyContent: "space-between",
  },
  carName: { fontSize: 22, color: "#414141", fontWeight: 600 },
  status: { fontSize: 17, marginTop: 2, color: "#8B8B8B" },
  amount: { fontSize: 18, color: "#414141" },
  cardDetails: {
    padding: 18,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  ownerDetails: { flexDirection: "row", gap: 6, alignItems: "center" },
  img: { height: 35, width: 35, borderRadius: 50 },
  name: {
    fontSize: Platform.OS === "android" ? 18 : 19,
    fontWeight: Platform.OS === "android" ? 400 : 500,
  },
  btn: {
    padding: 8,
    paddingHorizontal: 18,
    minWidth: 80,
    borderRadius: 50,
    backgroundColor: "#269355",
  },
  btnText: {
    textAlign: "center",
    fontSize: 18,
    color: "#fff",
  },
});
