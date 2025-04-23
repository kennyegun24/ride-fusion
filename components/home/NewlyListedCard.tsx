import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import Car from "./Car";
import { CarObjProps } from "@/types/carTypes";

interface CarProps {
  data: CarObjProps[];
}
const NewlyListedCard: FC<CarProps> = ({ data }) => {
  return (
    <View>
      <Text style={styles.title}>Newly Listed Cars</Text>
      <View style={styles.mapContainer}>
        {data.map((e, _) => (
          <Car key={_} {...e} />
        ))}
      </View>
    </View>
  );
};

export default NewlyListedCard;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 500,
    marginTop: 12,
    marginBottom: 16,
  },
  mapContainer: {
    gap: 12,
  },
});
