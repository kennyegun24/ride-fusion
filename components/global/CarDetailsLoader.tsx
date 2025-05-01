import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";

const CarDetailsLoader = () => {
  const { width } = Dimensions.get("screen");
  return (
    <View>
      <Skeleton show radius={0} colorMode="light" width={width} height={250} />

      <ScrollView style={{ padding: 12 }}>
        <View
          style={{
            marginVertical: 12,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Skeleton show radius={6} colorMode="light" width={150} height={30} />
          <Skeleton
            show
            radius={50}
            colorMode="light"
            width={100}
            height={30}
          />
        </View>
        <View style={{ gap: 4, marginTop: 12 }}>
          <Skeleton show radius={6} colorMode="light" width={80} height={20} />
          <Skeleton show radius={6} colorMode="light" width={120} height={20} />
          <Skeleton show radius={6} colorMode="light" width={110} height={20} />
          <Skeleton
            show
            radius={6}
            colorMode="light"
            width={width / 1.5}
            height={25}
          />
        </View>

        <View style={{ marginVertical: 16 }}>
          <Skeleton
            show
            radius={6}
            colorMode="light"
            width={width}
            height={100}
          />
        </View>

        <View style={{ marginVertical: 4 }}>
          <Skeleton show radius={6} colorMode="light" width={80} height={20} />

          <View style={{ flexDirection: "row", gap: 8, marginTop: 8 }}>
            <Skeleton
              show
              radius={50}
              colorMode="light"
              width={55}
              height={20}
            />
            <Skeleton
              show
              radius={50}
              colorMode="light"
              width={55}
              height={20}
            />
            <Skeleton
              show
              radius={50}
              colorMode="light"
              width={55}
              height={20}
            />
          </View>
        </View>

        <View
          style={{
            marginTop: 24,
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
          }}
        >
          <Skeleton show radius={50} colorMode="light" width={50} height={50} />

          <View style={{ gap: 3 }}>
            <Skeleton
              show
              radius={6}
              colorMode="light"
              width={80}
              height={20}
            />
            <Skeleton
              show
              radius={6}
              colorMode="light"
              width={120}
              height={20}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default CarDetailsLoader;

const styles = StyleSheet.create({});
