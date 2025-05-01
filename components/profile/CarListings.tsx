import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";

const CarListings = () => {
  return (
    <View style={{ marginTop: 8 }}>
      <Text style={styles.overviewHeader}>Car Listings</Text>

      <ScrollView
        horizontal
        style={{ marginVertical: 18 }}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.scroll}>
          <View style={styles.carList}>
            <Image
              source={require("@assets/images/audi1.webp")}
              style={styles.carImage}
            />
            <View style={styles.nameContainer}>
              <Text style={styles.carName}>Toyota Hilux 2022</Text>
              <Text style={styles.price}>NGN30,000</Text>
            </View>
          </View>
          <View style={styles.carList}>
            <Image
              source={require("@assets/images/audi1.webp")}
              style={styles.carImage}
            />
            <View style={styles.nameContainer}>
              <Text style={styles.carName}>Toyota Hilux 2022</Text>
              <Text style={styles.price}>NGN30,000</Text>
            </View>
          </View>
          <View style={styles.carList}>
            <Image
              source={require("@assets/images/audi1.webp")}
              style={styles.carImage}
            />
            <View style={styles.nameContainer}>
              <Text style={styles.carName}>Toyota Hilux 2022</Text>
              <Text style={styles.price}>NGN30,000</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default CarListings;

const styles = StyleSheet.create({
  overviewHeader: { fontSize: 17, fontWeight: 600 },
  scroll: { flexDirection: "row", gap: 12 },
  carList: {
    borderRadius: 12,
    overflow: "hidden",
    width: 150,
    borderColor: "#E9E9E9",
    borderWidth: 1,
    backgroundColor: "#171C2208",
  },
  carImage: { width: 150, height: 90 },
  nameContainer: { paddingHorizontal: 8, paddingVertical: 12 },
  carName: { color: "#8B8B8B", fontSize: 15 },
  price: { color: "#269355", fontSize: 15, fontWeight: 600, marginTop: 6 },
});
