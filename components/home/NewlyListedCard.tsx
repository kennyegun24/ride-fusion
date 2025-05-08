import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import Car from "./Car";
import { CarObjProps } from "@/types/carTypes";
import OtherCar from "../global/OtherCar";
import { ItemLoader } from "./itemLoader";
import { ThemedText } from "../ThemedText";

interface CarProps {
  data: CarObjProps[];
  loading: boolean;
}
const NewlyListedCard: FC<CarProps> = ({ data, loading }) => {
  return (
    <View>
      <ThemedText style={styles.title}>Newly Listed Cars</ThemedText>
      {loading ? (
        <ItemLoader no={2} />
      ) : (
        <FlatList
          data={data}
          renderItem={({ item }) => {
            return <OtherCar details={item} />;
          }}
          horizontal
          keyExtractor={(item) => item._id as string}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ width: 8 }} />}
        />
      )}
    </View>
  );
};

export default NewlyListedCard;

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
