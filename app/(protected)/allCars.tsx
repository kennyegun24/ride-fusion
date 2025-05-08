import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { BlurView } from "expo-blur";
import { AllCarsHeader } from "@/components/allcars/Header";
import useSWR from "swr";
import axios from "axios";
import { FlashList } from "@shopify/flash-list";
import { CarObjProps } from "@/types/carTypes";
import Car from "@/components/home/Car";
import SearchLoader from "@/components/search/SearchLoader";
import { ThemedView } from "@/components/ThemedView";
import { API_ROUTE } from "@/utils/apiRoute";

const DEFAULT_HEADER_HEIGHT = 80;
const onHeaderLayout = (event: any, setHeaderHeight: any) => {
  const { height } = event.nativeEvent.layout;
  setHeaderHeight(height);
};

const allCars = () => {
  const [headerHeight, setHeaderHeight] = useState(DEFAULT_HEADER_HEIGHT);
  const params = useLocalSearchParams();
  const fetcher = async () => {
    try {
      const req = await axios.get(`${API_ROUTE}cars/user/${params.id}`);
      const res = await req.data;
      return await res;
    } catch (error) {}
  };

  const { data, error, isLoading } = useSWR(params.id as string, fetcher);

  return (
    <ThemedView style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerShown: true,
          // headerTitle: `${params.fullName} cars`,
          header: () => (
            <View onLayout={(e) => onHeaderLayout(e, setHeaderHeight)}>
              <AllCarsHeader params={params} />
            </View>
          ),
        }}
      />
      {isLoading ? (
        <SearchLoader top={headerHeight} />
      ) : (
        <FlashList
          data={data as CarObjProps[]}
          keyExtractor={(item) => item._id as string}
          renderItem={({ item, index }) => (
            <View
              style={{
                flexGrow: 1,
                paddingLeft: index % 4 === 0 ? 6 : index % 2 === 0 ? 6 : 0,
                paddingRight: index % 1 === 0 ? 6 : 0,
                paddingBottom: index % 1 === 0 ? 6 : 0,
              }}
            >
              <Car
                {...item}
                downloadURL={item.user?.downloadURL}
                fullName={item.user?.fullName}
              />
            </View>
          )}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          estimatedItemSize={250}
          contentOffset={{
            y: -headerHeight,
            x: 0,
          }}
          contentInset={{
            top: headerHeight + 20,
          }}
        />
      )}
    </ThemedView>
  );
};

export default allCars;

const styles = StyleSheet.create({});
