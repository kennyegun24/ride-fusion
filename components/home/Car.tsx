import {
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  InteractionManager,
} from "react-native";
import React, { FC } from "react";
import { CarObjProps } from "@/types/carTypes";
import { router } from "expo-router";
import { number_formatter } from "@/utils/formatter.helper";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";

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
    <ThemedView
      darkColor="#2F2F2F"
      border_d_color="#E0E0E040"
      border_l_color="#e9e9e9"
      style={styles.container}
    >
      <TouchableOpacity
        // style={styles.container}
        activeOpacity={0.9}
        onPress={() => {
          InteractionManager.runAfterInteractions(() => {
            router.push(`/cars-pages/${_id}`);
          });
        }}
      >
        <Image source={{ uri: images[0] }} style={styles.carImg} />
        <View style={styles.subContainer}>
          <View>
            <ThemedText
              style={styles.carName}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {car_name} {model}
            </ThemedText>
            <ThemedText style={styles.status}>
              {available ? "Available Now" : "Unavailable"}
            </ThemedText>
          </View>
          <ThemedText style={styles.amount}>
            ${number_formatter(rentalPricePerDay || 0)}/day
          </ThemedText>
        </View>

        <View style={styles.cardDetails}>
          <View style={styles.ownerDetails}>
            <Image
              source={
                owner_image
                  ? { uri: owner_image }
                  : require("@assets/images/no_image.png")
              }
              style={styles.img}
            />
            <ThemedText style={styles.name}>{owner_name}</ThemedText>
          </View>
          {/* <Pressable style={styles.btn}>
            <Text style={styles.btnText}>Rent Now</Text>
          </Pressable> */}
        </View>
      </TouchableOpacity>
    </ThemedView>
  );
};

export default Car;

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 1,
    // borderColor: "#E9E9E9",
    width: "100%",
  },
  carImg: {
    height: 120,
    width: "100%",
    resizeMode: "cover",
  },
  subContainer: {
    paddingVertical: 12,
    gap: 4,
    paddingHorizontal: 6,
  },
  carName: { fontSize: 16, fontWeight: 600 },
  status: { fontSize: 14, marginTop: 2 },
  amount: { fontSize: 14, fontWeight: 700 },
  cardDetails: {
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  ownerDetails: { flexDirection: "row", gap: 6, alignItems: "center" },
  img: { height: 35, width: 35, borderRadius: 50 },
  name: {
    fontSize: 15,
    fontWeight: Platform.OS === "android" ? 400 : 600,
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
