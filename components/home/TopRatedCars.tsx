import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { CarObjProps } from "@/types/carTypes";
import OtherCar from "../global/OtherCar";
import { ItemLoader } from "./itemLoader";
import { ThemedText } from "../ThemedText";

interface CarProps {
  data: CarObjProps[];
  loading: boolean;
}
const TopRatedCars: FC<CarProps> = ({ data, loading }) => {
  return (
    <View>
      <ThemedText style={styles.title}>Cars Near You</ThemedText>
      {loading ? (
        <ItemLoader no={2} />
      ) : (
        <FlatList
          data={data}
          renderItem={({ item }) => {
            return <OtherCar details={item} />;
          }}
          keyExtractor={(item) => item._id as string}
          showsVerticalScrollIndicator={false}
          horizontal
          ItemSeparatorComponent={() => <View style={{ width: 8 }} />}
          showsHorizontalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default TopRatedCars;

const styles = StyleSheet.create({
  title: {
    fontSize: 17,
    fontWeight: 500,
    marginTop: 12,
    marginBottom: 12,
    lineHeight: 20,
  },
  mapContainer: {
    gap: 12,
  },
});
