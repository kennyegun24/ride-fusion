import { StyleSheet, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import debounce from "lodash/debounce";
import Header from "@/components/search/Header";
import axios from "axios";
import { FlashList } from "@shopify/flash-list";
import { CarObjProps } from "@/types/carTypes";
import Car from "@/components/home/Car";
import SearchEmpty from "@/components/search/SearchEmpty";
import SearchLoader from "@/components/search/SearchLoader";
import { ThemedView } from "@/components/ThemedView";
import { API_ROUTE } from "@/utils/apiRoute";

const DEFAULT_HEADER_HEIGHT = 80;
const onHeaderLayout = (event: any, setHeaderHeight: any) => {
  const { height } = event.nativeEvent.layout;
  setHeaderHeight(height);
};

const searchedCars = () => {
  const params = useLocalSearchParams();
  const [searchValue, setSearchValue] = useState(
    (params?.text as string) || ""
  );
  const [cars, setCars] = useState([]);
  const [headerHeight, setHeaderHeight] = useState(DEFAULT_HEADER_HEIGHT);
  const [loading, setLoading] = useState(false);

  const fetchSearch = async (query: string) => {
    setLoading(true);
    try {
      const req = await axios.get(`${API_ROUTE}cars/search?query=${query}`);
      const res = await req.data.cars;
      setCars(res);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const onDebounceSearch = useCallback(
    debounce((query: string) => {
      fetchSearch(query);
    }, 800),
    []
  );
  const onSearchChange = async (e: string) => {
    setSearchValue(e);
    onDebounceSearch(e);
  };

  useEffect(() => {
    if (params.text && params.text.length > 2) {
      fetchSearch(params.text as string);
    }
  }, [params.text]);

  return (
    <ThemedView style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTransparent: true,
          header: () => (
            <View onLayout={(e) => onHeaderLayout(e, setHeaderHeight)}>
              <Header
                onSearchChange={onSearchChange}
                searchValue={searchValue}
              />
            </View>
          ),
        }}
      />
      {loading ? (
        <SearchLoader top={headerHeight} />
      ) : cars.length > 0 ? (
        <FlashList
          data={cars as CarObjProps[]}
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
      ) : (
        <SearchEmpty />
      )}
    </ThemedView>
  );
};

export default searchedCars;

const styles = StyleSheet.create({});
