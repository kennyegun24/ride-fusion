import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import Car from "./Car";
import { CarObjProps } from "@/types/carTypes";
import { FlashList } from "@shopify/flash-list";

interface CarProps {
  data: CarObjProps[];
}
const TopRatedCars: FC<CarProps> = ({ data }) => {
  return (
    // <View style={{ flex: 1 }}>
    <>
      <Text style={styles.title}>Top Rated Cars</Text>
      <FlashList
        data={data}
        renderItem={({ item }) => {
          return (
            <Car
              {...item}
              downloadURL={item.user?.downloadURL}
              fullName={item.user?.fullName}
            />
          );
        }}
        keyExtractor={(item) => item._id as string}
        estimatedItemSize={100} // Adjust this based on your Car component height
        showsVerticalScrollIndicator={false}
      />
    </>
    // </View>
  );
};

export default TopRatedCars;

const styles = StyleSheet.create({
  title: {
    fontSize: 17,
    fontWeight: 500,
    marginTop: 12,
    marginBottom: 16,
  },
  mapContainer: {
    gap: 12,
  },
});
